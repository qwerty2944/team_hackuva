import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "hello-team-hackuva",
    title: "안녕하세요, Team Hackuva입니다.",
    excerpt: "해커톤에서 시작해 세 개의 제품으로 이어진 작은 팀의 기록.",
    author: "Team Hackuva",
    publishedAt: "2026-05-10",
    readingMinutes: 3,
    tags: ["팀소개", "Team Hackuva"],
    body: `# 안녕하세요, Team Hackuva입니다

저희는 \`아이디어 → 데모 → 라이브 서비스\`까지 가능한 한 빨리 가는 것을 좋아하는 작은 팀입니다.
지금까지 셋을 만들었습니다.

- **Realtime Doctor** — 진료실에서 의사가 듣고 적는 시간을 줄여주는 AI 오버레이
- **Turns** — 보드게임을 같이 할 사람을 찾는 매칭 플랫폼
- **Entangle** — 카카오톡 단톡방을 AI 대시보드로 다시 보는 도구

각 프로젝트의 만든 과정을 짧은 글로 남겨두려고 합니다. 이 블로그가 그 기록입니다.

> TODO: 팀원 소개, 팀 이름의 유래, 다음에 만들 것을 여기에 채워주세요.`,
  },
  {
    slug: "building-realtime-doctor",
    title: "Realtime Doctor를 만든 이유",
    excerpt:
      "진료에 집중하면 기록을 놓치고, 기록에 집중하면 환자를 못 본다. 오버레이로 해결한 이야기.",
    author: "Team Hackuva",
    publishedAt: "2026-05-08",
    readingMinutes: 6,
    tags: ["AI", "의료", "케이스스터디"],
    projectSlug: "realtime-doctor",
    body: `# Realtime Doctor를 만든 이유

진료실에서 의사는 두 가지를 동시에 합니다. 환자를 본다, 그리고 그것을 EMR에 적는다.
둘 중 어느 쪽에 비중을 두든 다른 한쪽이 깎입니다.

## 우리가 잡은 가설

> 화면을 \`바꾸지 않고\` 그 위에 \`살짝\` 정보를 띄우면, 의사는 진료에만 집중할 수 있다.

그래서 7개의 투명 오버레이를 띄웠습니다. 전사, 감별진단, 의학용어, 다음 질문 제안, 화자 표시, 요약, 의무기록 초안.

## 어려웠던 점

- **한·영 혼용 전사** — "환자분 BP 좀 재볼게요" 같은 문장
- **화자 분리** — 두 사람이 한 마이크를 공유할 때
- **오버레이 UX** — 띄우되 시야를 가리지 않아야 한다

> TODO: 화자 분리 모델 선택 근거, Supabase 스키마, 베타테스트 피드백을 채워주세요.`,
  },
  {
    slug: "turns-matching-engine",
    title: "Turns: 매칭은 가볍게, 약속은 확실하게",
    excerpt:
      "보드게임을 같이 할 사람을 찾는 일은 의외로 어렵습니다. Turns는 그 마찰을 줄입니다.",
    author: "Team Hackuva",
    publishedAt: "2026-05-05",
    readingMinutes: 4,
    tags: ["매칭", "보드게임", "케이스스터디"],
    projectSlug: "turns",
    body: `# Turns: 매칭은 가볍게, 약속은 확실하게

보드게임 모임을 잡는 건 \`게임 / 인원 / 장소 / 시간\` 네 변수가 동시에 맞아야 성립합니다.
Turns는 이 네 변수를 한 화면에서 잡습니다.

## 디자인 원칙

1. **방 만들기는 30초 안에 끝난다**
2. **합류는 한 번의 탭으로 끝난다**
3. **초보 환영 태그는 디폴트가 ON이다**

> TODO: 첫 매칭 성공률, 가장 자주 매칭된 게임, 다음 마일스톤을 채워주세요.`,
  },
  {
    slug: "entangle-semantic-search",
    title: "Entangle: 단톡방을 기억하는 두 번째 뇌",
    excerpt:
      "카카오톡 단톡방의 정보는 휘발됩니다. 봇 하나만 초대하면 다시는 잃지 않습니다.",
    author: "Team Hackuva",
    publishedAt: "2026-05-02",
    readingMinutes: 5,
    tags: ["AI", "검색", "카카오톡", "케이스스터디"],
    projectSlug: "entangle",
    body: `# Entangle: 단톡방을 기억하는 두 번째 뇌

"그거 단톡방 어디쯤에 있었는데..."로 시작하는 검색을 모두 해보셨을 겁니다.
키워드 검색은 동의어, 맥락, 의도를 못 잡습니다.

## Entangle이 하는 일

- 단톡방에 봇을 초대하면 메시지가 **자동으로 인덱싱**됩니다.
- 검색은 키워드가 아니라 **의미**로 합니다.
- "지난 달 그 카페 이름 뭐였지" 같은 질문에도 답합니다.
- 분석 탭에서는 단톡방 자체에 대한 **AI 인사이트**를 제공합니다.

## 설계 메모

- 임베딩은 메시지 단위가 아닌 \`발화 묶음\` 단위로
- 채팅방마다 별도의 네임스페이스
- 검색 응답은 \`근거 메시지 링크\`와 함께

> TODO: 사용된 임베딩 모델, 비용 구조, 프라이버시 정책을 채워주세요.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allTags(): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}
