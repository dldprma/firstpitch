"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaUser, FaEnvelope, FaSearch } from "react-icons/fa";

export default function FindIdForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [foundUsername, setFoundUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: 실제 아이디 찾기 API 호출
      // const response = await findIdAPI(formData);
      
      // 임시 로직 (테스트용)
      if (formData.email) {
        // 성공 시
        setFoundUsername("testuser123");
        setSuccess(true);
        console.log("아이디 찾기 성공:", formData.email);
      } else {
        setError("이메일을 입력해주세요.");
      }
    } catch (err) {
      setError("아이디 찾기 중 오류가 발생했습니다. 다시 시도해주세요.");
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
    if (error) setError("");
  };

  const handleBackToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      {/* Header */}
      <header className="text-center mb-8">
        <div className="w-16 h-16 bg-[#5AA60E] rounded-full flex items-center justify-center mx-auto mb-4">
          <FaSearch size={30} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-pretendard">
          아이디 찾기
        </h1>
        <p className="text-[#5AA60E] font-medium font-pretendard">
          가입하신 이메일로 아이디를 찾아보세요
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

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2 font-pretendard">
            아이디를 찾았습니다!
          </h3>
          <p className="text-sm text-green-700 font-pretendard mb-3">
            가입하신 아이디는 다음과 같습니다:
          </p>
          <div className="bg-white p-3 rounded border border-green-300">
            <p className="text-lg font-bold text-green-800 font-pretendard">
              {foundUsername}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      {!success && (
        <main>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            role="form"
            aria-label="아이디 찾기 폼"
          >
            <fieldset className="space-y-6">
              <legend className="sr-only">아이디 찾기 정보 입력</legend>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
                >
                  이메일 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope color="#989AAA" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard"
                    placeholder="가입하신 이메일을 입력하세요."
                    required
                    aria-required="true"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </fieldset>

            {/* Find ID Button */}
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full py-3"
              aria-label="아이디 찾기"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  찾는 중...
                </>
              ) : (
                <>
                  <FaSearch size={20} color="white" />
                  아이디 찾기
                </>
              )}
            </Button>
          </form>
        </main>
      )}

      {/* Footer Links */}
      <footer className="text-center mt-6 space-y-3">
        {success ? (
          <Button
            onClick={handleBackToLogin}
            variant="outline"
            size="lg"
            className="w-full py-3"
          >
            로그인으로 돌아가기
          </Button>
        ) : (
          <p className="text-sm text-gray-500 font-pretendard">
            아이디를 찾으셨나요?{" "}
            <Link
              href="/auth/login"
              className="text-[#5AA60E] hover:underline font-medium"
            >
              로그인하기
            </Link>
          </p>
        )}
        
        <p className="text-sm text-gray-500 font-pretendard">
          아직 회원이 아니신가요?{" "}
          <Link
            href="/auth/signup"
            className="text-[#5AA60E] hover:underline font-medium"
          >
            회원가입
          </Link>
        </p>
      </footer>
    </>
  );
}
