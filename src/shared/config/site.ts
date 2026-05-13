export const siteConfig = {
  name: "Team Hackuva",
  description:
    "해커톤에서 시작해 라이브 서비스를 만드는 작은 팀, Team Hackuva의 블로그.",
  url: "https://team-hackuva.vercel.app",
  github: "https://github.com/qwerty2944/team_hackuva",
  nav: [
    { href: "/", label: "홈" },
    { href: "/projects", label: "프로젝트" },
    { href: "/blog", label: "블로그" },
    { href: "/about", label: "팀" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
