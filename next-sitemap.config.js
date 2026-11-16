// next-sitemap.config.js (create in your project root)
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.starworks.in", // Replace with your domain
  generateRobotsTxt: true, // Generate robots.txt file
  generateIndexSitemap: false, // Don't generate sitemap index for small sites
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/404",
    "/500",
    "/api/*", // Exclude API routes
    "/_app",
    "/_document",
  ],
  transform: async (config, path) => {
    // Custom priority and changefreq for your specific pages
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path === "/services") {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path.startsWith("/services/")) {
      priority = 0.9;
      changefreq = "monthly";
    } else if (path === "/portfolio" || path === "/case-studies") {
      priority = 0.8;
      changefreq = "monthly";
    } else if (path === "/about") {
      priority = 0.7;
      changefreq = "monthly";
    } else if (path === "/location") {
      priority = 0.9;
      changefreq = "weekly";
    } else if (path === "/blog") {
      priority = 0.7;
      changefreq = "daily";
    } else if (path.startsWith("/blog/")) {
      priority = 0.6;
      changefreq = "weekly";
    } else if (path === "/contact-us") {
      priority = 0.6;
      changefreq = "yearly";
    } else if (path === "/privacy-policy") {
      priority = 0.3;
      changefreq = "yearly";
    } else if (path === "/terms-conditions") {
      priority = 0.3;
      changefreq = "yearly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api/", "/_app", "/_document"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed in the future
    ],
  },
};
