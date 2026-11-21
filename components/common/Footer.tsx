import Link from "next/link";
import { StarWorksLogo, StarWorksLogoIcon } from "./Icons";
import { GitHubIcon, CalIcon, LinkedInIcon } from "./LeftSideIcons";
import { siteFacts } from "@/lib/siteFacts";

const columns = [
  {
    title: "Services",
    links: [
      { name: "Websites", href: "/services" },
      { name: "Mobile apps", href: "/services" },
      { name: "AI agents & automation", href: "/services" },
      { name: "UI/UX & product design", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Our work", href: "/portfolio" },
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faqs" },
      { name: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

const social =
  "hover:bg-primary/20 text-antiflash hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:scale-[1.08]";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto mb-8 w-full max-w-348 px-4 pt-4">
      <div className="rounded-3xl border border-white/5 bg-linear-to-br from-deep-forest via-dark-moss to-moss p-6 lg:p-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-5 inline-block text-white" aria-label="Star Works home">
              <span className="sm:hidden">
                <StarWorksLogoIcon />
              </span>
              <span className="hidden sm:block">
                <StarWorksLogo />
              </span>
            </Link>
            <p className="text-antiflash/80 max-w-sm text-sm leading-relaxed">
              We design and build websites, mobile apps and AI automation for founders and growing businesses.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="https://github.com/farukh-work" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={social}>
                <GitHubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/farukh-khan1997/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={social}
              >
                <LinkedInIcon />
              </Link>
              <Link href={siteFacts.calLink} target="_blank" rel="noopener noreferrer" aria-label="Book a call" className={social}>
                <CalIcon />
              </Link>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-white">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="hover:text-primary text-sm text-white/65 transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} Star Works. A brand of {siteFacts.legalName}. All rights reserved.
          </p>
          <Link href={siteFacts.calLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Book a free call &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
