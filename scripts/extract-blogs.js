require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const readline = require("readline");
const TurndownService = require("turndown");
const chalk = require("chalk");

// Configuration
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");
const OUTPUT_DIR = path.join(__dirname, "../content/blog");
const CONFIG_PATH = path.join(__dirname, "blog-config.json");
const SCOPES = [
  "https://www.googleapis.com/auth/documents.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
];

// Your Google Drive folder ID (from the folder URL)
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
  defaultCoverImage: "/images/blog/default.jpg",
  interactiveMode: false, // Set to true if you want to be prompted each time
};

// Try to load config from file if it exists
if (fs.existsSync(CONFIG_PATH)) {
  try {
    const configFile = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
    blogConfig = { ...blogConfig, ...configFile };
    console.log(chalk.green("✓ Loaded configuration from blog-config.json"));
  } catch (error) {
    console.log(
      chalk.yellow("⚠ Could not load blog-config.json, using defaults")
    );
  }
}

// Initialize Turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// ==================== AUTHENTICATION ====================

async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

  // Handle both web and installed credential formats
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

  // Check if we have a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  return getNewToken(oAuth2Client);
}

async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log(chalk.blue("\n🔐 Authorize this app by visiting this url:"));
  console.log(chalk.cyan(authUrl));
  console.log(
    chalk.yellow("\nAfter authorizing, you'll be redirected to a URL.")
  );
  console.log(
    chalk.yellow("Copy the ENTIRE URL from your browser's address bar.\n")
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(
      chalk.yellow("Paste the full redirect URL here: "),
      async (input) => {
        rl.close();

        try {
          // Extract code from URL or use direct code
          let code = input.trim();

          // If user pasted full URL, extract the code parameter
          if (code.includes("code=")) {
            const url = new URL(code);
            code = url.searchParams.get("code");
          }

          if (!code) {
            throw new Error("No authorization code found in the input");
          }

          console.log(
            chalk.gray("\n⏳ Exchanging authorization code for access token...")
          );

          const { tokens } = await oAuth2Client.getToken(code);
          oAuth2Client.setCredentials(tokens);

          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
          console.log(chalk.green("✓ Token stored to", TOKEN_PATH));

          resolve(oAuth2Client);
        } catch (error) {
          console.error(chalk.red("\n✗ Error retrieving access token:"));
          console.error(chalk.red(error.message));
          console.log(chalk.yellow("\n💡 Make sure you:"));
          console.log(
            chalk.yellow("  1. Completed the authorization in your browser")
          );
          console.log(chalk.yellow("  2. Copied the ENTIRE redirect URL"));
          console.log(
            chalk.yellow(
              "  3. Have the correct redirect URI configured in Google Cloud Console"
            )
          );
          reject(error);
        }
      }
    );
  });
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

            // Apply text formatting
            if (textStyle.bold && textStyle.italic) {
              content = `***${content.trim()}***`;
            } else if (textStyle.bold) {
              content = `**${content.trim()}**`;
            } else if (textStyle.italic) {
              content = `*${content.trim()}*`;
            }

            // Handle links
            if (textStyle.link) {
              content = `[${content.trim()}](${textStyle.link.url})`;
            }

            // Handle code
            if (textStyle.weightedFontFamily?.fontFamily === "Courier New") {
              content = `\`${content.trim()}\``;
            }

            text += content;
          }
        });
      }

      // Handle paragraph styles
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
      // Handle tables
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
      fields: "files(id, name, modifiedTime)",
      orderBy: "modifiedTime desc",
    });

    return response.data.files || [];
  } catch (error) {
    console.error(chalk.red("Error listing documents:"), error);
    return [];
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
  // Generate slug from title
  const slug = docTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Extract first paragraph as excerpt
  const lines = content.split("\n").filter((line) => line.trim());
  const excerpt =
    lines
      .find(
        (line) =>
          line.length > 50 && !line.startsWith("#") && line.trim().length > 0
      )
      ?.substring(0, 200) || "Blog post description";

  // Estimate reading time
  const wordCount = content.split(/\s+/).length;
  const readTime = `${Math.ceil(wordCount / 200)} min read`;

  // Extract title (first H1 or doc title)
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
  name: "${customData.authorName || "Star Works Team"}"
  role: "${customData.authorRole || "Content Writer"}"
  avatar: "${customData.authorAvatar || "/images/team/default.jpg"}"
category: "${customData.category || "Web Development"}"
tags: ${JSON.stringify(customData.tags || ["Next.js", "Web Development"])}
publishedAt: "${customData.publishedAt || now}"
readTime: "${metadata.readTime}"
coverImage: "${customData.coverImage || "/images/blog/default.jpg"}"
featured: ${customData.featured || false}
---

`;
}

// ==================== MAIN EXTRACTION ====================

async function extractBlogPost(auth, file, customMetadata = {}) {
  console.log(chalk.blue(`\n📄 Processing: ${file.name}`));

  const doc = await getDocumentContent(auth, file.id);
  if (!doc) {
    console.log(chalk.red("✗ Failed to get document content"));
    return null;
  }

  console.log(chalk.gray("  Converting to markdown..."));
  const markdown = convertGoogleDocToMarkdown(doc);

  console.log(chalk.gray("  Extracting metadata..."));
  const metadata = extractMetadata(file.name, markdown);

  console.log(chalk.gray("  Creating frontmatter..."));
  const frontmatter = createFrontmatter(metadata, customMetadata);

  const fullContent = frontmatter + markdown;

  // Save to file
  const filename = `${metadata.slug}.md`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, fullContent, "utf8");

  console.log(chalk.green(`✓ Saved: ${filename}`));
  console.log(
    chalk.gray(
      `  Words: ${metadata.wordCount}, Reading time: ${metadata.readTime}`
    )
  );

  return { filename, metadata };
}

// ==================== INTERACTIVE SETUP ====================

async function promptForMetadata(docName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  console.log(chalk.cyan(`\n📝 Configure metadata for: "${docName}"`));

  const authorName =
    (await question("Author name (default: Star Works Team): ")) ||
    "Star Works Team";
  const authorRole =
    (await question("Author role (default: Content Writer): ")) ||
    "Content Writer";
  const category =
    (await question("Category (default: Web Development): ")) ||
    "Web Development";
  const tagsInput =
    (await question(
      "Tags (comma-separated, default: Next.js,Web Development): "
    )) || "Next.js,Web Development";
  const tags = tagsInput.split(",").map((t) => t.trim());
  const featured =
    (await question("Featured post? (y/n, default: n): "))?.toLowerCase() ===
    "y";

  rl.close();

  return {
    authorName,
    authorRole,
    authorAvatar: "/images/team/default.jpg",
    category,
    tags,
    featured,
    coverImage: "/images/blog/default.jpg",
  };
}

// ==================== MAIN FUNCTION ====================

async function main() {
  console.log(chalk.bold.green("\n🚀 Star Works Blog Extractor\n"));

  // Check if output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(chalk.green(`✓ Created output directory: ${OUTPUT_DIR}`));
  }

  // Authorize
  console.log(chalk.blue("🔐 Authenticating..."));
  const auth = await authorize();
  console.log(chalk.green("✓ Authenticated successfully\n"));

  // List documents
  console.log(chalk.blue("📁 Fetching documents from Google Drive..."));
  const files = await listDocumentsInFolder(auth, BLOG_FOLDER_ID);

  if (files.length === 0) {
    console.log(chalk.yellow("⚠ No documents found in the specified folder"));
    return;
  }

  console.log(chalk.green(`✓ Found ${files.length} document(s)\n`));

  // Process each document
  const results = [];
  for (const file of files) {
    try {
      // Prompt for custom metadata
      const customMetadata = await promptForMetadata(file.name);

      const result = await extractBlogPost(auth, file, customMetadata);
      if (result) {
        results.push(result);
      }
    } catch (error) {
      console.error(
        chalk.red(`✗ Error processing ${file.name}:`),
        error.message
      );
    }
  }

  // Summary
  console.log(chalk.bold.green(`\n✨ Extraction complete!`));
  console.log(
    chalk.white(
      `📊 Successfully extracted ${results.length}/${files.length} documents`
    )
  );
  console.log(chalk.gray(`📂 Output directory: ${OUTPUT_DIR}\n`));

  // List created files
  results.forEach((result, index) => {
    console.log(chalk.white(`  ${index + 1}. ${result.filename}`));
  });

  console.log(chalk.cyan("\n💡 Next steps:"));
  console.log(chalk.gray("  1. Review the generated markdown files"));
  console.log(chalk.gray("  2. Add cover images to public/images/blog/"));
  console.log(chalk.gray("  3. Run: npm run dev"));
  console.log(chalk.gray("  4. Visit: http://localhost:3000/blog\n"));
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { extractBlogPost, authorize };
