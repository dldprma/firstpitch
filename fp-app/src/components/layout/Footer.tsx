import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-[#f37c38] rounded-full flex items-center justify-center">
              <span
                className="text-white text-sm font-bold"
                aria-label="야구공"
              >
                ⚾
              </span>
            </div>
            <span className="text-xl font-bold font-pretendard">
              First Pitch
            </span>
          </div>
          <p className="text-gray-300 font-pretendard">
            당신의 첫 시구를 응원합니다
          </p>
        </div>

        <nav
          className="flex flex-wrap justify-center gap-6 mb-8 text-sm"
          role="navigation"
          aria-label="푸터 네비게이션"
        >
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors font-pretendard"
          >
            [소개]
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors font-pretendard"
          >
            [이용약관]
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors font-pretendard"
          >
            [개인정보처리방침]
          </Link>
          <Link
            href="#"
            className="text-gray-300 hover:text-white transition-colors font-pretendard"
          >
            [Contact]
          </Link>
        </nav>

        <div className="text-center text-sm text-gray-400">
          <p className="mb-2 font-pretendard">
            © 2025 First Pitch. Made with <span aria-label="야구공">⚾️</span>{" "}
            by Winter
          </p>
          <nav
            className="flex justify-center space-x-4"
            role="navigation"
            aria-label="소셜 링크"
          >
            <Link
              href="#"
              className="hover:text-white transition-colors font-pretendard"
            >
              GitHub
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors font-pretendard"
            >
              Notion
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors font-pretendard"
            >
              Email
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
