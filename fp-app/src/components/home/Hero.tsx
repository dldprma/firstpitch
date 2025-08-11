import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      role="banner"
      aria-labelledby="hero-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          id="hero-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f37c38] mb-6 leading-tight font-pretendard"
        >
          야구의 세계에 오신것을
          <br />
          환영합니다!
        </div>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-pretendard">
          야구에 눈뜬 순간, 당신의 필드가 열립니다!
          <br className="hidden sm:block" />
          야구 룰·용어·퀴즈·구장 팁까지!
        </p>
        <Button
          variant="primary"
          size="lg"
          aria-label="야구 입덕 가이드 시작하기"
        >
          지금 시작하기
        </Button>
      </div>
    </section>
  );
}
