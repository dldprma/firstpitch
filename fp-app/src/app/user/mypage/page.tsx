"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { useRequireAuth } from "@/lib/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MyPage() {
  // 인증이 필요한 페이지
  useRequireAuth("/auth/login");

  // 사용자 정보 가져오기
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return null; // useRequireAuth에서 처리됨
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#F37C38] mb-8">마이페이지</h1>

          {/* 사용자 정보 섹션 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  아이디
                </label>
                <p className="text-gray-900">{user.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  닉네임
                </label>
                <p className="text-gray-900">{user.nickname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  이메일
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  가입일
                </label>
                <p className="text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </div>
          </section>

          {/* 활동 내역 섹션 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              활동 내역
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#E5F5D6] rounded-lg">
                <div className="text-2xl font-bold text-[#5AA60E]">0</div>
                <div className="text-sm text-gray-600">완료한 퀴즈</div>
              </div>
              <div className="text-center p-4 bg-[#E5F5D6] rounded-lg">
                <div className="text-2xl font-bold text-[#5AA60E]">0</div>
                <div className="text-sm text-gray-600">학습한 규칙</div>
              </div>
              <div className="text-center p-4 bg-[#E5F5D6] rounded-lg">
                <div className="text-2xl font-bold text-[#5AA60E]">0</div>
                <div className="text-sm text-gray-600">방문한 구장</div>
              </div>
            </div>
          </section>

          {/* 설정 섹션 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">설정</h2>
            <div className="space-y-4">
              <button className="w-full md:w-auto px-6 py-3 bg-[#5AA60E] text-white rounded-lg hover:bg-[#4A8F0D] transition-colors">
                프로필 수정
              </button>
              <button className="w-full md:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                비밀번호 변경
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
