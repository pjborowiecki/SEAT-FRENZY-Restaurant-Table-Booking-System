import type { FooterItem, MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/",
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  github:
    "https://github.com/pjborowiecki/https://github.com/pjborowiecki/SeatFrenzy-Restaurant-Table-Booking-System",
  main: "http://localhost:3000",
  ogImage: "http://localhost:3000/opengraph-image.png",
}

export const siteConfig = {
  name: "SeatFrenzy",
  description:
    "SeatFrenzy is a restaraunt booking system, allowing users to quickly book tables at their favourite restaurants. Built with Next.js 13, Drizzle ORM (with PostgreSQL hosten on PlanetScale), and TailwindCSS.",
  url: links.main,
  ogImage: links.ogImage,
  links,
  mainNav: [
    {
      title: "Landing",
      items: [
        {
          title: "Venues",
          href: "/",
          description: "All the venues we have to offer",
          items: [],
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Read our latest blog posts",
          items: [],
        },
        {
          title: "Dashboard",
          href: "/dashboard/",
          description: "Manage your bookings and venues",
          items: [],
        },
      ],
    },
  ],
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
