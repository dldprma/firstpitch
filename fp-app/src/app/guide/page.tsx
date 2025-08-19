import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#F37C38] mb-8">
            야구 입덕 가이드
          </h1>
          <p className="text-gray-600 mb-6">
            야구를 처음 접하는 분들을 위한 입문 가이드입니다.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                야구의 기본 규칙
              </h2>
              <p className="text-gray-700">
                야구의 핵심 규칙과 게임 진행 방식을 알아봅니다.
              </p>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                포지션별 역할
              </h2>
              <p className="text-gray-700">
                각 포지션의 역할과 책임을 이해합니다.
              </p>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                야구 용어 사전
              </h2>
              <p className="text-gray-700">
                자주 사용되는 야구 용어들을 정리했습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
