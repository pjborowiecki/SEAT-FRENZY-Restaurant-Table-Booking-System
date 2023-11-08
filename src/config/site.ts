import type { FooterItem, MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/pjborowiecki",
  linkedin: "https://linkedin.com/in/pjborowiecki",
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  github:
    "https://github.com/pjborowiecki/https://github.com/pjborowiecki/SeatFrenzy-Restaurant-Table-Booking-System",
  main: "http://localhost:3000",
  authorsWebsite: "https://pawelborowiecki.com",
  ogImage: "http://localhost:3000/opengraph-image.png",
}

export const siteConfig = {
  name: "SeatFrenzy",
  description:
    "SeatFrenzy is a restaraunt booking system, allowing users to quickly book tables at their favourite restaurants. Built with Next.js 14, Next-Auth, Drizzle ORM (with MySQL hosted on PlanetScale), and TailwindCSS.",
  url: links.main,
  ogImage: links.ogImage,
  links,
  author: "pjborowiecki",
  hostingRegion: "fra1",
  keywords: [
    "Restaurant table booking",
    "Booking system",
    "Table booking",
    "Restaurant booking",
    "OpenTable alternative",
  ],
  mainNav: [
    {
      title: "About Us",
      items: [
        {
          title: "Read More",
          href: "/about",
          description: "Learn more about SeatFrenzy",
          items: [],
        },
        {
          title: "FAQ",
          href: "/faq",
          description: "Find out the answers",
          items: [],
        },
        {
          title: "Contact",
          href: "/contact",
          description: "Get in touch with us",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },
        {
          title: "GitHub",
          href: links.github,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
}
