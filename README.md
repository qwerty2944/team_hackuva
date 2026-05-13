# Team Hackuva — Blog

해커톤에서 시작해 라이브 서비스를 만드는 작은 팀, **Team Hackuva**의 블로그입니다.

라이브: <https://team-hackuva.vercel.app>

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**, **Tailwind CSS 4**
- **shadcn/ui** + **Base UI**
- **Supabase** — 인증, Postgres (방명록)
- **Framer Motion**, **GSAP** — 모션
- 배포: **Vercel**

## Project Structure

[Feature-Sliced Design](https://feature-sliced.design/) 레이아웃을 따릅니다.

```
src/
├── app/           # Next.js App Router (라우트, 메타데이터, sitemap/robots/og)
├── widgets/       # 페이지를 구성하는 큰 블록 (헤더, 푸터, 피드 등)
├── features/      # 사용자 행동 단위 (로그인, 방명록 작성/삭제 등)
├── entities/      # 도메인 모델 (user, post, project, guestbook-entry)
└── shared/        # 재사용 가능한 UI, lib, config, supabase 클라이언트
```

Supabase 배럴은 클라이언트와 서버를 분리합니다:

- `@/shared/api/supabase` — 브라우저 클라이언트 + 타입
- `@/shared/api/supabase/server` — `next/headers`를 쓰는 서버 전용 (`import "server-only"`)

## Getting Started

```bash
npm install
cp .env.example .env.local   # 아래 환경변수 채우기
npm run dev
```

[http://localhost:3000](http://localhost:3000) 열기.

### 필요한 환경변수

`.env.local`에 다음 키를 채워주세요.

```env
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # 선택, 미설정 시 자동 추정
```

## Scripts

| 명령           | 설명                              |
| -------------- | --------------------------------- |
| `npm run dev`  | 개발 서버 (Turbopack)             |
| `npm run build`| 프로덕션 빌드                     |
| `npm run start`| 빌드 결과 실행                    |
| `npm run lint` | ESLint                            |

## SEO

- `src/app/layout.tsx` — Open Graph / Twitter / robots / canonical
- `src/app/sitemap.ts`, `src/app/robots.ts` — 동적 생성
- `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx` — 소셜 카드 (1200×630)
- `src/app/icon.tsx`, `src/app/apple-icon.tsx` — 파비콘 (브랜드 H 마크)
- 동적 라우트(`/blog/[slug]`, `/projects/[slug]`)는 `generateMetadata`로 article OG 생성

## Deploy

```bash
vercel
```

Vercel에 위 환경변수를 등록하면 자동 배포됩니다.
