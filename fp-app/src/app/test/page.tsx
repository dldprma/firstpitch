import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-800 mb-4">
          🚨 테스트 페이지
        </h1>
        <p className="text-xl text-red-700">
          이 페이지가 보이면 라우팅은 정상입니다!
        </p>
        <div className="mt-8 p-4 bg-white rounded-lg">
          <p className="text-green-800 font-bold">✅ /test 페이지 접근 성공!</p>
        </div>
      </div>
    </div>
  );
}
