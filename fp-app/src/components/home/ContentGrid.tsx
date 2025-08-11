import ContentCard from "./ContentCard";

const contentData = [
  {
    icon: "⚾",
    title: "야구 입덕 가이드",
    description: "야구의 기본·경기 흐름·포지션까지 한눈에 익혀보세요.",
  },
  {
    icon: "📚",
    title: "야구 용어 사전",
    description: "중계가 더 재밌어지는 야구 필수 용어예요.",
  },
  {
    icon: "🎯",
    title: "야구 퀴즈",
    description: "야구 지식, 퀴즈로 바로 확인해봐요.",
  },
  {
    icon: "🏟️",
    title: "구장별 팁",
    description: "야구장 200% 즐기는 방법, 여기 있어요.",
  },
  {
    icon: "🔊",
    title: "더그아웃",
    description: "야구 팬들의 수다와 정보가 모이는 곳이에요.",
  },
];

export default function ContentGrid() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      role="region"
      aria-labelledby="content-title"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12 relative font-pretendard">
          어떤 것부터 시작할까요?
          <div className="absolute top-15 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#5aa60e]"></div>
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          role="list"
        >
          {contentData.map((item, index) => (
            <ContentCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
