import { NextResponse } from "next/server";
import { ownerEmail, thankYouEmail } from "@/lib/emailTemplates";

const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024; // keep under the host body limit
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const projectDetails = formData.get("projectDetails") as string;
    const pdfFile = formData.get("pdfFile") as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }
    if (!isEmail(email) || name.length > 200 || (projectDetails || "").length > 5000) {
      return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL;

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { error: "Email service is not configured (missing API Key)." },
        { status: 500 }
      );
    }

    if (!toEmail) {
      console.error("Missing CONTACT_FORM_TO_EMAIL environment variable");
      return NextResponse.json(
        { error: "Recipient email is not configured." },
        { status: 500 }
      );
    }

    // Format attachments
    const attachments = [];
    if (pdfFile && pdfFile.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Attachment is too large (max 4 MB)." }, { status: 413 });
    }
    if (pdfFile && pdfFile.size > 0) {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      attachments.push({
        content: buffer.toString("base64"),
        filename: pdfFile.name,
      });
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in").replace(/\/$/, "");
    const sender = fromEmail.includes("<") ? fromEmail : `Star Works <${fromEmail}>`;

    const send = (payload: Record<string, unknown>) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

    // 1) Notification to you (must succeed)
    const owner = ownerEmail({
      name,
      email,
      whatsapp,
      projectDetails,
      hasAttachment: attachments.length > 0,
      siteUrl,
    });
    const resendResponse = await send({
      from: sender,
      to: toEmail,
      reply_to: email,
      subject: owner.subject,
      html: owner.html,
      text: owner.text,
      attachments,
    });
    const responseData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", responseData);
      return NextResponse.json(
        { error: responseData.message || "Failed to send email." },
        { status: resendResponse.status }
      );
    }

    // 2) Thank-you email to the visitor (best effort; never blocks the form)
    if (process.env.CONTACT_FORM_AUTOREPLY !== "off") {
      try {
        const thanks = thankYouEmail({ name, siteUrl });
        const r = await send({
          from: sender,
          to: email,
          reply_to: toEmail,
          subject: thanks.subject,
          html: thanks.html,
          text: thanks.text,
        });
        if (!r.ok) console.error("Thank-you email failed:", await r.text());
      } catch (e) {
        console.error("Thank-you email error:", e);
      }
    }

    return NextResponse.json({ success: true, id: responseData.id });
  } catch (error: any) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
