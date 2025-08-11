"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MdOutlineLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: 실제 로그인 API 호출
      // const response = await loginAPI(formData);

      // 임시 로그인 로직 (테스트용)
      if (formData.username && formData.password) {
        // 로그인 성공 시
        console.log("로그인 성공:", formData);
        router.push("/"); // 홈으로 리다이렉트
      } else {
        // 로그인 실패 시
        setError("아이디와 비밀번호를 모두 입력해주세요.");
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 입력 시 에러 메시지 제거
    if (error) setError("");
  };

  return (
    <>
      {/* Header */}
      <header className="text-center mb-8">
        <div className="w-16 h-16 bg-[#5AA60E] rounded-full flex items-center justify-center mx-auto mb-4">
          <MdOutlineLogin size={"30px"} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-pretendard">
          로그인
        </h1>
        <p className="text-[#5AA60E] font-medium font-pretendard">
          Welcome Back to First Pitch!
        </p>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-pretendard text-center">
            {error}
          </p>
        </div>
      )}

      {/* Form */}
      <main>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          role="form"
          aria-label="로그인 폼"
        >
          <fieldset className="space-y-6">
            <legend className="sr-only">로그인 정보 입력</legend>

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
              >
                아이디
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser color="#989AAA" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard"
                  placeholder="아이디를 입력하세요."
                  required
                  aria-required="true"
                  aria-describedby="username-help"
                  disabled={isLoading}
                />
              </div>
              <div id="username-help" className="sr-only">
                아이디를 입력해주세요
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
              >
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock color="#989AAA" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard"
                  placeholder="비밀번호를 입력하세요."
                  required
                  aria-required="true"
                  aria-describedby="password-help"
                  disabled={isLoading}
                />
              </div>
              <div id="password-help" className="sr-only">
                비밀번호를 입력해주세요
              </div>
            </div>
          </fieldset>

          {/* Login Button */}
          <Button
            type="submit"
            variant="secondary"
            size="md"
            className="w-full py-3"
            aria-label="로그인하기"
            radius="xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                로그인 중...
              </>
            ) : (
              <>
                <MdOutlineLogin size={"20px"} color="white" />
                로그인
              </>
            )}
          </Button>
        </form>
      </main>

      {/* Footer Links */}
      <footer className="text-center mt-6 space-y-2">
        <p className="text-sm text-gray-500 font-pretendard">
          <Link
            href="/auth/find-id"
            className="hover:text-[#5AA60E] transition-colors"
          >
            아이디/비밀번호를 잊으셨나요?
          </Link>
        </p>
        <p className="text-sm text-gray-500 font-pretendard">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/auth/register"
            className="text-[#5AA60E] hover:underline font-medium"
          >
            회원가입
          </Link>
        </p>
      </footer>
    </>
  );
}
