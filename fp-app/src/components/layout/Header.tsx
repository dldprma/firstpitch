"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "야구 입덕 가이드", href: "#" },
  { label: "야구사전", href: "#" },
  { label: "야구퀴즈", href: "#" },
  { label: "구장별 팁", href: "#" },
  { label: "더그아웃", href: "#" },
  { label: "로그인", href: "/auth/login" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지 및 모바일 메뉴가 열려있을 때 배경 스크롤 방지
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 10px 이상일 때만 배경 적용
      const scrollPosition = window.scrollY;
      const shouldShowBackground = scrollPosition > 10;
      setIsScrolled(shouldShowBackground);

      // 디버깅용 로그
      console.log(
        "Scroll position:",
        scrollPosition,
        "Should show background:",
        shouldShowBackground
      );
    };

    // 초기 스크롤 상태 확인
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // 모바일 메뉴 닫기 함수
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-sm" : ""
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* 로고 */}
          <div className="flex items-center flex-shrink-0">
            <a
              href="/"
              className="flex items-center"
              aria-label="First Pitch 홈으로 이동"
            >
              <Image
                src="/images/logo.png"
                alt="First Pitch Logo"
                width={250}
                height={150}
                className="h-16 sm:h-20 w-auto"
              />
            </a>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav
            className="hidden lg:flex items-center flex-1 ml-16"
            role="navigation"
            aria-label="메인 네비게이션"
          >
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-900 hover:text-[#5aa60e] hover:font-semibold transition-all relative font-pretendard group text-2xl font-medium"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5aa60e] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ))}
            </div>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="lg:hidden p-3 rounded-md text-gray-600 hover:text-primary hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기/닫기"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-200/30 py-4 bg-white/90 backdrop-blur-sm rounded-lg mt-2 shadow-lg mx-4"
            role="navigation"
            aria-label="모바일 메뉴"
          >
            <nav className="flex flex-col space-y-0">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-900 hover:text-[#5aa60e] hover:font-semibold transition-all py-4 px-6 border-b border-gray-100 active:bg-gray-50 font-pretendard relative group text-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5aa60e] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
