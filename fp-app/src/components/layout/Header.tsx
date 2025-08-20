"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { useAuth } from "@/lib/hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Redux 상태에서 인증 정보 가져오기
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();

  // 컴포넌트 마운트 후에만 클라이언트 사이드 로직 실행
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 스크롤 감지 및 모바일 메뉴가 열려있을 때 배경 스크롤 방지
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // 스크롤 위치가 10px 이상일 때만 배경 적용
      const scrollPosition = window.scrollY;
      const shouldShowBackground = scrollPosition > 10;
      setIsScrolled(shouldShowBackground);
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
  }, [isMobileMenuOpen, isMounted]);

  // 모바일 메뉴 닫기 함수
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 네비게이션 아이템을 동적으로 생성
  const getNavItems = () => {
    const baseItems = [
      { label: "야구 입덕 가이드", href: "/tutorial" },
      { label: "야구사전", href: "/dictionary" },
      { label: "야구퀴즈", href: "/quiz" },
      { label: "구장별 팁", href: "/stadiums" },
      { label: "더그아웃", href: "/dugout" },
    ];

    // 로그인 상태에 따라 마지막 항목 변경
    if (isAuthenticated && user) {
      baseItems.push({ label: "마이페이지", href: "/user/mypage" });
    } else {
      baseItems.push(
        { label: "로그인", href: "/auth/login" },
        { label: "회원가입", href: "/auth/register" }
      );
    }

    return baseItems;
  };

  const NAV_ITEMS = getNavItems();

  // 현재 경로가 메뉴 항목과 일치하는지 확인하는 함수
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // 서버 사이드 렌더링 시 기본 상태로 렌더링
  if (!isMounted) {
    return (
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* 로고 */}
            <div className="flex items-center flex-shrink-0">
              <Link
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
              </Link>
            </div>

            {/* 데스크톱 네비게이션 - 기본 상태 */}
            <nav
              className="hidden lg:flex items-center flex-1 ml-16"
              role="navigation"
              aria-label="메인 네비게이션"
            >
              <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
                {[
                  { label: "야구 입덕 가이드", href: "/guide" },
                  { label: "야구사전", href: "/dictionary" },
                  { label: "야구퀴즈", href: "/quiz" },
                  { label: "구장별 팁", href: "/stadiums" },
                  { label: "더그아웃", href: "/dugout" },
                  { label: "로그인", href: "/auth/login" },
                  { label: "회원가입", href: "/auth/register" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`transition-all relative font-pretendard group text-xl font-medium ${
                      isActiveLink(item.href)
                        ? "text-[#5aa60e] font-semibold"
                        : "text-gray-900 hover:text-[#5aa60e] hover:font-semibold"
                    }`}
                  >
                    {item.label}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5aa60e] transition-opacity ${
                        isActiveLink(item.href)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden p-3 rounded-md text-gray-600 hover:text-primary hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
              aria-label="메뉴 열기/닫기"
              aria-expanded={false}
              aria-controls="mobile-menu"
            >
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
            </button>
          </div>
        </div>
      </header>
    );
  }

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
            <Link
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
            </Link>
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
                  className={`transition-all relative font-pretendard group text-2xl font-medium ${
                    isActiveLink(item.href)
                      ? "text-[#5aa60e] font-semibold"
                      : "text-gray-900 hover:text-[#5aa60e] hover:font-semibold"
                  }`}
                >
                  {item.label}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5aa60e] transition-opacity ${
                      isActiveLink(item.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Link>
              ))}

              {/* 로그아웃 버튼 */}
              {isAuthenticated && user && (
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 font-semibold text-xl font-pretendard transition-colors duration-200 cursor-pointer hover:bg-red-50 rounded-md"
                >
                  <IoLogOutOutline size={24} />
                  <span className="hidden sm:inline">로그아웃</span>
                </button>
              )}
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
                  className={`transition-all py-4 px-6 border-b border-gray-100 active:bg-gray-50 font-pretendard relative group text-lg font-medium ${
                    isActiveLink(item.href)
                      ? "text-[#5aa60e] font-semibold"
                      : "text-gray-900 hover:text-[#5aa60e] hover:font-semibold"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5aa60e] transition-opacity ${
                      isActiveLink(item.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Link>
              ))}

              {/* 모바일 로그아웃 버튼 */}
              {isAuthenticated && user && (
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 py-4 px-6 text-gray-600 hover:text-red-600 font-semibold text-lg font-pretendard transition-colors duration-200 cursor-pointer hover:bg-gray-50 w-full text-left border-b border-gray-100 last:border-b-0"
                >
                  <IoLogOutOutline size={20} />
                  <span>로그아웃</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
