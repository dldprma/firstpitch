import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#F37C38] mb-8">야구퀴즈</h1>
          <p className="text-gray-600 mb-6">
            야구 지식을 테스트해보세요! 다양한 난이도의 퀴즈를 준비했습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-[#E5F5D6] rounded-lg text-center">
              <div className="text-2xl font-bold text-[#5AA60E] mb-2">초급</div>
              <div className="text-sm text-gray-600">야구 입문자용</div>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg text-center">
              <div className="text-2xl font-bold text-[#5AA60E] mb-2">중급</div>
              <div className="text-sm text-gray-600">야구 애호가용</div>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg text-center">
              <div className="text-2xl font-bold text-[#5AA60E] mb-2">고급</div>
              <div className="text-sm text-gray-600">야구 전문가용</div>
            </div>
          </div>
          <div className="text-center">
            <button className="px-8 py-4 bg-[#5AA60E] text-white rounded-lg hover:bg-[#4A8F0D] transition-colors text-lg font-semibold">
              퀴즈 시작하기
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
