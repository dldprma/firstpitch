import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StadiumsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#F37C38] mb-8">구장별 팁</h1>
          <p className="text-gray-600 mb-6">
            각 야구장의 특징과 관람 팁을 알아보세요!
          </p>
          <div className="space-y-6">
            <div className="p-6 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-3">
                잠실야구장
              </h2>
              <p className="text-gray-700 mb-3">
                서울의 대표 야구장으로, LG 트윈스와 두산 베어스의 홈구장입니다.
              </p>
              <div className="text-sm text-gray-600">
                <p>• 주소: 서울특별시 송파구 올림픽로 25</p>
                <p>• 교통: 지하철 2호선 잠실역</p>
                <p>• 팁: 외야석에서 홈런을 잡을 수 있어요!</p>
              </div>
            </div>
            <div className="p-6 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-3">
                사직야구장
              </h2>
              <p className="text-gray-700 mb-3">
                부산의 대표 야구장으로, 롯데 자이언츠의 홈구장입니다.
              </p>
              <div className="text-sm text-gray-600">
                <p>• 주소: 부산광역시 동래구 사직로 45</p>
                <p>• 교통: 지하철 1호선 사직역</p>
                <p>• 팁: 바다가 보이는 야구장이에요!</p>
              </div>
            </div>
            <div className="p-6 bg-[#E5F5D6] rounded-lg">
              <h2 className="text-xl font-semibold text-[#5AA60E] mb-3">
                대구야구장
              </h2>
              <p className="text-gray-700 mb-3">
                대구의 대표 야구장으로, 삼성 라이온즈의 홈구장입니다.
              </p>
              <div className="text-sm text-gray-600">
                <p>• 주소: 대구광역시 수성구 야구전설로 1</p>
                <p>• 교통: 지하철 2호선 대구야구장역</p>
                <p>• 팁: 야구 박물관도 함께 관람할 수 있어요!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
