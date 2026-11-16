import Head from "next/head";
import { useRouter } from "next/router";

const DEFAULT_SITE_NAME = "Star Works";
const DEFAULT_TITLE = "Star Works | EraTech's Innovation with Dynamic Team";
const DEFAULT_DESCRIPTION =
  "EraTech, driven by a skilled team, is committed to innovation and lasting impact. Join us in shaping the future.";
const DEFAULT_KEYWORDS =
  "Star Works, EraTech, Figma to Next.js, Figma to React, web developers, web design, Next.js development, web development, HTML, CSS, React, Tailwind, Bootstrap, Firebase, Nodejs, MongoDB, Strapi CMS";
const DEFAULT_OG_IMAGE = "/star-works-metaimage.webp";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in";

const PageSEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  noindex = false,
  additionalMetaTags = [],
  additionalLinkTags = [],
}: PageSEOProps = {}) => {
  const router = useRouter();

  // Generate dynamic values
  const pageTitle = title || DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageKeywords = keywords || DEFAULT_KEYWORDS;
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE;

  // Generate canonical URL
  const pageCanonicalUrl = canonicalUrl || `${BASE_URL}${router.asPath}`;

  // Clean URL for og:url (remove query params if needed)
  const ogUrl = `${BASE_URL}${router.pathname}`;

  return (
    <Head>
      {/* Essential Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageCanonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Favicon and App Icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />

      {/* Microsoft Tags */}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

      {/* Theme Color */}
      <meta name="theme-color" content="#ffffff" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`${BASE_URL}${pageOgImage}`} />
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${BASE_URL}${pageOgImage}`} />

      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => {
        if (tag.property) {
          return (
            <meta key={index} property={tag.property} content={tag.content} />
          );
        }
        return <meta key={index} name={tag.name!} content={tag.content} />;
      })}

      {/* Additional Link Tags */}
      {additionalLinkTags.map((tag, index) => (
        <link
          key={index}
          rel={tag.rel}
          href={tag.href}
          {...(tag.sizes && { sizes: tag.sizes })}
          {...(tag.type && { type: tag.type })}
        />
      ))}
    </Head>
  );
};

export default PageSEO;
