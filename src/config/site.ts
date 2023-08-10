export type SiteConfig = typeof siteConfig

const links = {
  twitter: "",
  facebook: "",
  instagram: "",
  github: "https://github.com/pjborowiecki",
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
  mainNav: [],
  footerNav: [],
}
