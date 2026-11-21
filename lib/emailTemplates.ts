// HTML + plain-text email templates for the contact form.
// Tables and inline styles only, so they render in Gmail, Outlook and Apple Mail.

const BRAND = "#16c95f"; // Star Works green
const DARK = "#04140c";
const INK = "#10211a";
const MUTED = "#5b6b63";
const BG = "#eef4f0";

export const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();
const digitsOnly = (v: string) => v.replace(/[^\d]/g, "");

function shell(opts: { preheader: string; title: string; body: string; siteUrl: string }) {
  const { preheader, title, body, siteUrl } = opts;
  const host = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${INK};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:28px 12px;">
 <tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(4,20,12,0.10);">
   <tr><td style="background:${DARK};padding:26px 32px;">
     <table role="presentation" width="100%"><tr>
      <td style="font-size:22px;font-weight:800;letter-spacing:1px;color:#ffffff;">STAR <span style="color:${BRAND};">WORKS</span></td>
      <td align="right" style="font-size:12px;color:#9fb5a8;">${escapeHtml(host)}</td>
     </tr></table>
   </td></tr>
   <tr><td style="height:4px;background:${BRAND};line-height:4px;font-size:4px;">&nbsp;</td></tr>
   ${body}
   <tr><td style="background:#f7faf8;padding:22px 32px;border-top:1px solid #e3ece6;font-size:12px;line-height:18px;color:${MUTED};">
     <strong style="color:${INK};">Star Works</strong> · Web design, development &amp; UI/UX<br>
     <a href="${escapeHtml(siteUrl)}" style="color:${BRAND};text-decoration:none;">${escapeHtml(host)}</a>
   </td></tr>
  </table>
 </td></tr>
</table>
</body></html>`;
}

function row(label: string, value: string, opts: { pre?: boolean } = {}) {
  return `<tr>
   <td style="padding:12px 0;border-bottom:1px solid #edf2ee;vertical-align:top;width:130px;font-size:12px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:${MUTED};">${label}</td>
   <td style="padding:12px 0;border-bottom:1px solid #edf2ee;vertical-align:top;font-size:15px;line-height:23px;color:${INK};${opts.pre ? "white-space:pre-wrap;" : ""}">${value}</td>
  </tr>`;
}

type Lead = {
  name: string;
  email: string;
  whatsapp?: string;
  projectDetails?: string;
  hasAttachment?: boolean;
  siteUrl: string;
};

/** Email you receive when someone fills the form. */
export function ownerEmail(lead: Lead) {
  const name = escapeHtml(oneLine(lead.name));
  const email = escapeHtml(lead.email);
  const wa = lead.whatsapp ? oneLine(lead.whatsapp) : "";
  const waDigits = digitsOnly(wa);
  const details = (lead.projectDetails || "").trim();

  const body = `
   <tr><td style="padding:32px 32px 8px 32px;">
     <div style="display:inline-block;background:#e6f9ee;color:#0b7a3a;font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;letter-spacing:.4px;">NEW ENQUIRY</div>
     <h1 style="margin:14px 0 6px 0;font-size:26px;line-height:32px;color:${INK};">${name} wants to work with you</h1>
     <p style="margin:0;font-size:15px;line-height:23px;color:${MUTED};">Someone just filled in the contact form on your website. Here are the details.</p>
   </td></tr>
   <tr><td style="padding:12px 32px 4px 32px;">
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", name)}
      ${row("Email", `<a href="mailto:${email}" style="color:${BRAND};text-decoration:none;font-weight:600;">${email}</a>`)}
      ${row("WhatsApp", wa ? (waDigits ? `<a href="https://wa.me/${waDigits}" style="color:${BRAND};text-decoration:none;font-weight:600;">${escapeHtml(wa)}</a>` : escapeHtml(wa)) : `<span style="color:${MUTED};">Not provided</span>`)}
      ${row("Project", details ? escapeHtml(details) : `<span style="color:${MUTED};">Not provided</span>`, { pre: true })}
      ${lead.hasAttachment ? row("Attachment", "Project brief attached to this email (PDF)") : ""}
     </table>
   </td></tr>
   <tr><td style="padding:22px 32px 34px 32px;">
     <a href="mailto:${email}?subject=${encodeURIComponent("Re: your enquiry to Star Works")}" style="display:inline-block;background:${BRAND};color:#04140c;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:999px;">Reply to ${name.split(" ")[0] || "them"}</a>
     <p style="margin:14px 0 0 0;font-size:12px;color:${MUTED};">Tip: pressing Reply in your mail app also answers them directly.</p>
   </td></tr>`;

  const html = shell({
    preheader: `New enquiry from ${oneLine(lead.name)}`,
    title: "New enquiry",
    body,
    siteUrl: lead.siteUrl,
  });
  const text = [
    `New enquiry from ${oneLine(lead.name)}`,
    "",
    `Name: ${oneLine(lead.name)}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${wa || "Not provided"}`,
    "",
    "Project:",
    details || "Not provided",
    lead.hasAttachment ? "\n(Project brief attached)" : "",
  ].join("\n");
  return { html, text, subject: `New enquiry from ${oneLine(lead.name)}` };
}

/** Thank-you email the visitor receives. Contains no free text from the form. */
export function thankYouEmail(lead: { name: string; siteUrl: string }) {
  const first = escapeHtml(oneLine(lead.name).split(" ")[0] || "there");
  const steps = [
    ["We read your message", "A real person on our team reviews every enquiry."],
    ["We reply within 24 hours", "You will hear from us on the email address you used."],
    ["We plan your project together", "A short call to understand your goals, then a clear proposal."],
  ]
    .map(
      ([t, d], i) => `<tr>
      <td style="vertical-align:top;padding:10px 14px 10px 0;width:34px;">
        <div style="width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:${BRAND};color:#04140c;font-weight:800;font-size:14px;">${i + 1}</div>
      </td>
      <td style="padding:10px 0;font-size:15px;line-height:22px;color:${INK};"><strong>${t}</strong><br><span style="color:${MUTED};">${d}</span></td>
    </tr>`
    )
    .join("");

  const body = `
   <tr><td style="padding:34px 32px 6px 32px;">
     <h1 style="margin:0 0 10px 0;font-size:28px;line-height:34px;color:${INK};">Thank you, ${first}! 👋</h1>
     <p style="margin:0;font-size:16px;line-height:25px;color:${MUTED};">We have received your message and we are excited to hear about your project.</p>
   </td></tr>
   <tr><td style="padding:22px 32px 6px 32px;">
     <div style="background:#f3faf6;border:1px solid #dcefe3;border-radius:14px;padding:18px 20px;">
       <div style="font-size:12px;font-weight:800;letter-spacing:.8px;color:#0b7a3a;margin-bottom:6px;">WHAT HAPPENS NEXT</div>
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
     </div>
   </td></tr>
   <tr><td style="padding:22px 32px 34px 32px;">
     <p style="margin:0 0 16px 0;font-size:15px;line-height:23px;color:${MUTED};">In the meantime, take a look at our recent work and services.</p>
     <a href="${escapeHtml(lead.siteUrl)}/services" style="display:inline-block;background:${BRAND};color:#04140c;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:999px;">Explore our services</a>
     <p style="margin:22px 0 0 0;font-size:12px;line-height:18px;color:${MUTED};">If you did not fill in this form, you can safely ignore this email.</p>
   </td></tr>`;

  const html = shell({
    preheader: "We received your message and will reply within 24 hours.",
    title: "Thank you for contacting Star Works",
    body,
    siteUrl: lead.siteUrl,
  });
  const text = [
    `Thank you, ${oneLine(lead.name).split(" ")[0] || "there"}!`,
    "",
    "We have received your message and will reply within 24 hours.",
    "",
    "What happens next:",
    "1. We read your message",
    "2. We reply within 24 hours",
    "3. We plan your project together",
    "",
    `Explore our services: ${lead.siteUrl}/services`,
    "",
    "If you did not fill in this form, you can safely ignore this email.",
    "— Star Works",
  ].join("\n");
  return { html, text, subject: "Thanks for contacting Star Works" };
}
