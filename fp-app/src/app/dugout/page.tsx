import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DugoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#F37C38] mb-8">더그아웃</h1>
          <p className="text-gray-600 mb-6">
            야구 팬들이 자유롭게 소통하는 게시판입니다.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                최근 게시글
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded border">
                  <h3 className="font-medium text-gray-800">
                    오늘 경기 어땠나요?
                  </h3>
                  <p className="text-sm text-gray-600">
                    작성자: 야구팬1 | 조회수: 45
                  </p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h3 className="font-medium text-gray-800">내일 경기 예측</h3>
                  <p className="text-sm text-gray-600">
                    작성자: 야구팬2 | 조회수: 32
                  </p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h3 className="font-medium text-gray-800">야구 규칙 질문</h3>
                  <p className="text-sm text-gray-600">
                    작성자: 야구초보 | 조회수: 28
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="px-6 py-3 bg-[#5AA60E] text-white rounded-lg hover:bg-[#4A8F0D] transition-colors font-semibold">
                글쓰기
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
