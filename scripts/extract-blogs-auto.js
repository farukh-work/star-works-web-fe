require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const TurndownService = require("turndown");
const chalk = require("chalk");

// Configuration
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");
const OUTPUT_DIR = path.join(__dirname, "../content/blog");
const CONFIG_PATH = path.join(__dirname, "blog-config.json");
const SYNC_STATE_PATH = path.join(__dirname, "sync-state.json");
const SCOPES = [
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
];

const BLOG_FOLDER_ID =
  process.env.GOOGLE_DRIVE_ID || "1oAokx7XV6He90LsVV7NXw-u5FXRHCxGr";

// Load blog configuration
let blogConfig = {
  defaultAuthor: {
    name: "Farukh",
    role: "Full stack developer",
    avatar: "/images/team/farukh.jpg",
  },
  defaultCategory: "Web Development",
  defaultTags: ["Next.js", "Web Development"],
  defaultFeatured: false,
  defaultCoverImage: "/blog-cover-image.png",
  interactiveMode: false,
};

if (fs.existsSync(CONFIG_PATH)) {
  try {
    const configFile = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
    blogConfig = { ...blogConfig, ...configFile };
  } catch (error) {
    console.log(
      chalk.yellow("⚠ Could not load blog-config.json, using defaults")
    );
  }
}

// Initialize Turndown
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// ==================== SYNC STATE MANAGEMENT ====================

function loadSyncState() {
  if (fs.existsSync(SYNC_STATE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(SYNC_STATE_PATH, "utf8"));
    } catch (error) {
      console.log(chalk.yellow("⚠ Could not load sync state, starting fresh"));
    }
  }
  return {
    processedFiles: [],
    lastSyncTime: null,
    totalProcessed: 0,
  };
}

function saveSyncState(state) {
  fs.writeFileSync(SYNC_STATE_PATH, JSON.stringify(state, null, 2));
}

// ==================== AUTHENTICATION ====================

async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const credentialData = credentials.web || credentials.installed;

  if (!credentialData) {
    throw new Error(
      'Invalid credentials format. Expected "web" or "installed" property.'
    );
  }

  const { client_secret, client_id, redirect_uris } = credentialData;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  throw new Error(
    "No token found. Please run the interactive script first to authorize."
  );
}

// ==================== GOOGLE DOCS CONVERSION ====================

function convertGoogleDocToMarkdown(doc) {
  let markdown = "";
  const content = doc.body.content;

  if (!content) return markdown;

  content.forEach((element) => {
    if (element.paragraph) {
      const paragraph = element.paragraph;
      let text = "";

      if (paragraph.elements) {
        paragraph.elements.forEach((elem) => {
          if (elem.textRun) {
            let content = elem.textRun.content;
            const textStyle = elem.textRun.textStyle || {};

            if (textStyle.bold && textStyle.italic) {
              content = `***${content.trim()}***`;
            } else if (textStyle.bold) {
              content = `**${content.trim()}**`;
            } else if (textStyle.italic) {
              content = `*${content.trim()}*`;
            }

            if (textStyle.link) {
              content = `[${content.trim()}](${textStyle.link.url})`;
            }

            if (textStyle.weightedFontFamily?.fontFamily === "Courier New") {
              content = `\`${content.trim()}\``;
            }

            text += content;
          }
        });
      }

      const style = paragraph.paragraphStyle?.namedStyleType;
      const trimmedText = text.trim();

      if (!trimmedText) {
        markdown += "\n";
        return;
      }

      switch (style) {
        case "HEADING_1":
          markdown += `# ${trimmedText}\n\n`;
          break;
        case "HEADING_2":
          markdown += `## ${trimmedText}\n\n`;
          break;
        case "HEADING_3":
          markdown += `### ${trimmedText}\n\n`;
          break;
        case "HEADING_4":
          markdown += `#### ${trimmedText}\n\n`;
          break;
        case "TITLE":
          markdown += `# ${trimmedText}\n\n`;
          break;
        default:
          markdown += `${text}\n`;
          break;
      }
    } else if (element.table) {
      markdown += "\n| Column 1 | Column 2 |\n|----------|----------|\n";
      element.table.tableRows?.forEach((row) => {
        markdown += "| ";
        row.tableCells?.forEach((cell) => {
          const cellText =
            cell.content?.[0]?.paragraph?.elements?.[0]?.textRun?.content || "";
          markdown += `${cellText.trim()} | `;
        });
        markdown += "\n";
      });
      markdown += "\n";
    }
  });

  return markdown;
}

// ==================== DRIVE OPERATIONS ====================

async function listDocumentsInFolder(auth, folderId) {
  const drive = google.drive({ version: "v3", auth });

  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
      fields: "files(id, name, modifiedTime, createdTime)",
      orderBy: "createdTime desc",
    });

    return response.data.files || [];
  } catch (error) {
    console.error(chalk.red("Error listing documents:"), error);
    throw error;
  }
}

async function getDocumentContent(auth, documentId) {
  const docs = google.docs({ version: "v1", auth });

  try {
    const doc = await docs.documents.get({ documentId });
    return doc.data;
  } catch (error) {
    console.error(chalk.red("Error getting document:"), error);
    return null;
  }
}

// ==================== METADATA EXTRACTION ====================

function extractMetadata(docTitle, content) {
  const slug = docTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const lines = content.split("\n").filter((line) => line.trim());
  const excerpt =
    lines
      .find(
        (line) =>
          line.length > 50 && !line.startsWith("#") && line.trim().length > 0
      )
      ?.substring(0, 200) || "Blog post description";

  const wordCount = content.split(/\s+/).length;
  const readTime = `${Math.ceil(wordCount / 200)} min read`;

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : docTitle;

  return {
    slug,
    title,
    excerpt: excerpt.replace(/[#*`]/g, "").trim(),
    readTime,
    wordCount,
  };
}

// ==================== FRONTMATTER CREATION ====================

function createFrontmatter(metadata, customData = {}) {
  const now = new Date().toISOString().split("T")[0];

  return `---
slug: ${metadata.slug}
title: "${metadata.title}"
excerpt: "${metadata.excerpt}"
author:
  name: "${customData.authorName || blogConfig.defaultAuthor.name}"
  role: "${customData.authorRole || blogConfig.defaultAuthor.role}"
  avatar: "${customData.authorAvatar || blogConfig.defaultAuthor.avatar}"
category: "${customData.category || blogConfig.defaultCategory}"
tags: ${JSON.stringify(customData.tags || blogConfig.defaultTags)}
publishedAt: "${customData.publishedAt || now}"
readTime: "${metadata.readTime}"
coverImage: "${customData.coverImage || blogConfig.defaultCoverImage}"
featured: ${customData.featured || blogConfig.defaultFeatured}
---

`;
}

// ==================== MAIN EXTRACTION ====================

async function extractBlogPost(auth, file) {
  const doc = await getDocumentContent(auth, file.id);
  if (!doc) {
    throw new Error("Failed to get document content");
  }

  const markdown = convertGoogleDocToMarkdown(doc);
  const metadata = extractMetadata(file.name, markdown);

  // Use default config for automated processing
  const customMetadata = {
    authorName: blogConfig.defaultAuthor.name,
    authorRole: blogConfig.defaultAuthor.role,
    authorAvatar: blogConfig.defaultAuthor.avatar,
    category: blogConfig.defaultCategory,
    tags: blogConfig.defaultTags,
    featured: blogConfig.defaultFeatured,
    coverImage: blogConfig.defaultCoverImage,
  };

  const frontmatter = createFrontmatter(metadata, customMetadata);
  const fullContent = frontmatter + markdown;

  const filename = `${metadata.slug}.md`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, fullContent, "utf8");

  return {
    filename,
    metadata,
    fileId: file.id,
    createdTime: file.createdTime,
  };
}

// ==================== MAIN AUTOMATED FUNCTION ====================

async function autoSync() {
  console.log(chalk.bold.green("\n🤖 Automated Blog Sync Started\n"));

  const startTime = new Date();

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load sync state
  const syncState = loadSyncState();
  console.log(
    chalk.blue(
      `📊 Previously processed: ${syncState.processedFiles.length} files`
    )
  );

  // Authorize
  const auth = await authorize();
  console.log(chalk.green("✓ Authenticated\n"));

  // List documents
  console.log(chalk.blue("📁 Fetching documents from Google Drive..."));
  const allFiles = await listDocumentsInFolder(auth, BLOG_FOLDER_ID);

  console.log(chalk.green(`✓ Found ${allFiles.length} total document(s)`));

  // Filter out already processed files
  const newFiles = allFiles.filter(
    (file) => !syncState.processedFiles.includes(file.id)
  );

  if (newFiles.length === 0) {
    console.log(chalk.yellow("\n⚠ No new documents to process"));
    console.log(chalk.gray("Everything is up to date!\n"));
    return {
      success: true,
      newFiles: 0,
      totalFiles: allFiles.length,
      processedFiles: [],
      message: "No new blogs to sync",
    };
  }

  console.log(
    chalk.cyan(`\n🆕 Found ${newFiles.length} new document(s) to process\n`)
  );

  // Process new documents
  const results = [];
  const errors = [];

  for (const file of newFiles) {
    try {
      console.log(chalk.blue(`📄 Processing: ${file.name}`));

      const result = await extractBlogPost(auth, file);
      console.log(result, "result");
      results.push(result);

      // Update sync state
      syncState.processedFiles.push(file.id);
      syncState.totalProcessed++;

      console.log(chalk.green(`✓ Saved: ${result.filename}`));
      console.log(
        chalk.gray(
          `  Words: ${result.metadata.wordCount}, Reading time: ${result.metadata.readTime}\n`
        )
      );
    } catch (error) {
      console.error(
        chalk.red(`✗ Error processing ${file.name}:`),
        error.message
      );
      errors.push({ file: file.name, error: error.message });
    }
  }

  // Update sync state
  syncState.lastSyncTime = startTime.toISOString();
  saveSyncState(syncState);

  // Summary
  const endTime = new Date();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(chalk.bold.green(`\n✨ Sync Complete!`));
  console.log(
    chalk.white(
      `📊 Processed: ${results.length}/${newFiles.length} new documents`
    )
  );
  console.log(chalk.white(`⏱️  Duration: ${duration}s`));
  console.log(chalk.gray(`📂 Output: ${OUTPUT_DIR}\n`));

  if (results.length > 0) {
    console.log(chalk.cyan("📝 New blog posts:"));
    results.forEach((result, index) => {
      console.log(chalk.white(`  ${index + 1}. ${result.filename}`));
    });
  }

  if (errors.length > 0) {
    console.log(chalk.red("\n❌ Errors:"));
    errors.forEach((err, index) => {
      console.log(chalk.red(`  ${index + 1}. ${err.file}: ${err.error}`));
    });
  }

  console.log("\n");

  return {
    success: true,
    newFiles: results.length,
    totalFiles: allFiles.length,
    processedFiles: results.map((r) => ({
      filename: r.filename,
      title: r.metadata.title,
      wordCount: r.metadata.wordCount,
    })),
    errors: errors,
    duration: `${duration}s`,
    timestamp: endTime.toISOString(),
  };
}

// ==================== CLI EXECUTION ====================

if (require.main === module) {
  autoSync()
    .then((result) => {
      if (result.newFiles === 0) {
        process.exit(0);
      }
      console.log(chalk.green("✅ Sync completed successfully"));
      process.exit(0);
    })
    .catch((error) => {
      console.error(chalk.red("\n❌ Sync failed:"), error.message);
      process.exit(1);
    });
}

module.exports = { autoSync };
