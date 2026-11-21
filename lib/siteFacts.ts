// Single source of truth for facts shown across the site.
// TODO(before production): every value marked PLACEHOLDER below must be replaced with real data.
// "XX" means "not filled in yet" so a made-up number can never go live by accident.

export const siteFacts = {
  brand: "Star Works",
  legalName: "Innovaft Private Limited", // TODO confirm exact legal name
  calLink: "https://cal.com/star-works/30min",
  fiverrUrl: "", // PLACEHOLDER: add your Fiverr profile link
  upworkUrl: "", // PLACEHOLDER: add your Upwork profile link
  replyTime: "24 hours", // TODO confirm the real promise
  stats: {
    projects: "XX+", // PLACEHOLDER: projects delivered
    years: "XX", // PLACEHOLDER: years of experience
    rating: "X.X", // PLACEHOLDER: Fiverr / Upwork rating
  },
  plans: [
    {
      name: "Starter",
      price: "From $XXX", // PLACEHOLDER
      blurb: "A clean, fast website to get you online.",
      features: ["Up to 5 pages", "Mobile-friendly design", "Contact form and basic SEO", "2 rounds of revisions"],
    },
    {
      name: "Growth",
      price: "From $X,XXX", // PLACEHOLDER
      blurb: "A custom website or app built around your goals.",
      features: ["Custom UI/UX design", "CMS so you can edit content", "Booking, payments or automations", "Priority support"],
      highlight: true,
    },
    {
      name: "Custom",
      price: "Let's talk",
      blurb: "Mobile apps, AI agents and larger systems.",
      features: ["Mobile app (iOS and Android)", "AI agents and workflow automation", "Integrations with your tools", "Dedicated project lead"],
    },
  ],
} as const;
