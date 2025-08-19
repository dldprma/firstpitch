import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DictionaryPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#E5F5D6_0%,_#F5F5F5_25%,_#F5F5F5_100%)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#F37C38] mb-8">야구사전</h1>
          <p className="text-gray-600 mb-6">
            야구와 관련된 모든 용어와 개념을 정리한 사전입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                타격 관련
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>• 안타 (Hit)</li>
                <li>• 홈런 (Home Run)</li>
                <li>• 타율 (Batting Average)</li>
                <li>• 타점 (RBI)</li>
              </ul>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                투구 관련
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>• 구종 (Pitch Types)</li>
                <li>• 구속 (Velocity)</li>
                <li>• 방어율 (ERA)</li>
                <li>• 삼진 (Strikeout)</li>
              </ul>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                수비 관련
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>• 아웃 (Out)</li>
                <li>• 어시스트 (Assist)</li>
                <li>• 실책 (Error)</li>
                <li>• 더블플레이 (Double Play)</li>
              </ul>
            </div>
            <div className="p-4 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-2">
                주루 관련
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>• 도루 (Stolen Base)</li>
                <li>• 득점 (Run)</li>
                <li>• 태그 (Tag)</li>
                <li>• 세이프 (Safe)</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
