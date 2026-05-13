import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "realtime-doctor",
    name: "Realtime Doctor",
    tagline: "진료에 집중하세요. 나머지는 실시간으로 정리됩니다.",
    description:
      "진료실 화면 위에 떠 있는 AI 오버레이. 의사-환자 대화를 실시간으로 받아쓰고, 감별진단 후보를 던지고, 의무기록 초안까지 한 번에 정리합니다.",
    url: "https://realtime-doctor.vercel.app/",
    features: [
      "실시간 한·영 혼용 전사",
      "감별진단(DDx) 자동 제시",
      "의학용어 추출 + 다음 질문 제안",
      "화자 자동 분류 (의사/환자)",
      "7개 투명 오버레이 동시 표시",
      "진료 요약 및 의무기록 초안 생성",
    ],
    stack: ["Electron", "macOS / Windows", "Supabase", "Realtime ASR"],
    status: "beta",
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    slug: "turns",
    name: "Turns",
    tagline: "보드게임할 사람, 한 턴 안에 찾기.",
    description:
      "혼자 사놓고 못 펼친 보드게임이 있나요? Turns는 같은 동네, 같은 게임, 같은 시간대의 플레이어를 매칭해주는 가벼운 매칭 플랫폼입니다.",
    url: "https://turns-liard.vercel.app/",
    features: [
      "게임 / 지역 / 시간대 기반 매칭",
      "방 만들기 & 합류 흐름",
      "초보 환영 태그",
    ],
    stack: ["Next.js", "Vercel"],
    status: "wip",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    slug: "entangle",
    name: "Entangle",
    tagline: "카카오톡 단톡방, AI로 다시 보다.",
    description:
      "봇을 단톡방에 초대해두면 대화가 자동으로 기록·인덱싱되고, 키워드가 아닌 의미로 검색합니다. 단톡방 위에 얹는 AI 대시보드.",
    url: "https://kakao-dashboard-self.vercel.app/",
    features: [
      "봇 초대 시 대화 자동 기록",
      "AI 시맨틱 검색 (의미 기반)",
      "AI 채팅 분석 & 인사이트",
      "튜토리얼 문서 제공",
    ],
    stack: ["Next.js", "Vector DB", "LLM"],
    status: "live",
    accent: "from-yellow-400/30 to-amber-500/10",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
