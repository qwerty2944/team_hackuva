export const siteConfig = {
  name: "qwerty2944",
  description:
    "웹·크로스플랫폼 앱을 만드는 개발자 qwerty2944(최재영)의 블로그.",
  url: "https://hackuva.vercel.app",
  github: "https://github.com/qwerty2944",
  nav: [
    { href: "/", label: "홈" },
    { href: "/projects", label: "프로젝트" },
    { href: "/blog", label: "블로그" },
    { href: "/guestbook", label: "방명록" },
    { href: "/about", label: "소개" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
