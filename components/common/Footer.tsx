import { client } from "@/sanity/client";
import { footerQuery } from "@/sanity/queries";
import Link from "next/link";
import FooterListItems from "./FooterListItems";
import { StarWorksLogo, StarWorksLogoIcon } from "./Icons";
import { GitHubIcon, CalIcon } from "./LeftSideIcons";

const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const footerData = await client.fetch(footerQuery);

  return (
    <footer className="mx-auto mb-10 w-full max-w-348 px-4">
      <div className="bg-gradient-to-br from-deep-forest via-dark-moss to-moss border border-white/5 rounded-2xl p-6 lg:p-8 xl:rounded-3xl xl:p-12">
        {/* MAIN FOOTER */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-6 inline-block text-3xl font-bold text-white"
            >
              <span className="sm:hidden">
                <StarWorksLogoIcon />
              </span>

              <span className="hidden sm:block">
                <StarWorksLogo />
              </span>
            </Link>

            <p className="text-antiflash mb-6 max-w-sm text-base leading-relaxed">
              {footerData?.description}
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex space-x-4">
              {/* GitHub Link */}
              <Link
                href="https://github.com/farukh-work"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:bg-primary/20 text-antiflash hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-[1.08]"
              >
                <GitHubIcon />
              </Link>

              {/* Cal.com Link */}
              <Link
                href="https://cal.com/star-works/30min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a call on Cal.com"
                className="hover:bg-primary/20 text-antiflash hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-[1.08]"
              >
                <CalIcon />
              </Link>
              {footerData?.socialLinks
                ?.filter((link: any) => {
                  const name = link.name?.toLowerCase();
                  return name !== "fa" && name !== "facebook";
                })
                ?.map((link: any, index: number) => (
                  <Link
                    key={index}
                    href={link.href || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-primary/20 text-antiflash hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-[1.08]"
                  >
                    {link.name.slice(0, 2)}
                  </Link>
                ))}
            </div>
          </div>

          {/* FOOTER SECTIONS */}
          {footerData?.footerSections?.map((section: any, index: number) => (
            <FooterListItems section={section} key={index} />
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="font-exo2 mb-4 text-sm text-white/60 md:mb-0">
              © {currentYear} {footerData?.copyrightText}
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-primary font-exo2 text-sm text-white/60 transition-colors duration-300"
              >
                Privacy
              </Link>

              <Link
                href="/terms-conditions"
                className="hover:text-primary font-exo2 text-sm text-white/60 transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
