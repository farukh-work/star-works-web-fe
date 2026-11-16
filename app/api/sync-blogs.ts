import { exec } from "child_process";
import { promisify } from "util";
import type { NextApiRequest, NextApiResponse } from "next";

const execPromise = promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = req.headers["x-sync-secret"] || req.body?.secret;

  if (!process.env.BLOG_SYNC_SECRET || secret !== process.env.BLOG_SYNC_SECRET) {
    if (process.env.NODE_ENV === "development") {
      console.log("❌ Unauthorized sync attempt");
    }
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (process.env.NODE_ENV === "development") {
      console.log("🔄 Starting blog sync...");
    }

    const { stdout, stderr } = await execPromise(
      "node scripts/extract-blogs-auto.js",
      {
        cwd: process.cwd(),
        env: { ...process.env },
        timeout: 120000,
      }
    );

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Blog sync completed");
      console.log(stdout);
    }

    return res.status(200).json({
      success: true,
      message: "Blogs synced successfully",
      timestamp: new Date().toISOString(),
      output: stdout.substring(0, 1000),
    });
  } catch (error: any) {
    console.error("❌ Blog sync failed:", error);

    return res.status(500).json({
      error: "Sync failed",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
