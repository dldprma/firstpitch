"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    nickname: "",
  });

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 이메일 인증 관련 상태
  const [emailVerification, setEmailVerification] = useState({
    isSent: false,
    isVerified: false,
    code: "",
    isLoading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgreementChange = (name: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // 이메일 인증 코드 전송
  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      setError("이메일을 먼저 입력해주세요.");
      return;
    }

    setEmailVerification((prev) => ({ ...prev, isLoading: true }));
    setError("");

    try {
      // TODO: 실제 API 호출로 변경
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 모의 API 호출

      setEmailVerification((prev) => ({
        ...prev,
        isSent: true,
        isLoading: false,
      }));
    } catch (err) {
      setError("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
      setEmailVerification((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    if (!emailVerification.code) {
      setError("인증 코드를 입력해주세요.");
      return;
    }

    setEmailVerification((prev) => ({ ...prev, isLoading: true }));
    setError("");

    try {
      // TODO: 실제 API 호출로 변경
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 모의 API 호출

      // 간단한 검증 (실제로는 서버에서 검증)
      if (emailVerification.code === "123456") {
        // 테스트용 코드
        setEmailVerification((prev) => ({
          ...prev,
          isVerified: true,
          isLoading: false,
        }));
        setError("");
      } else {
        setError("인증 코드가 일치하지 않습니다.");
        setEmailVerification((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      setError("인증 코드 확인에 실패했습니다. 다시 시도해주세요.");
      setEmailVerification((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerification.isVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      setError("필수 약관에 동의해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: 실제 회원가입 API 호출
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 성공 시 처리 (예: 로그인 페이지로 이동)
      console.log("회원가입 성공:", formData);
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <header className="text-center mb-8">
        <div className="w-16 h-16 bg-[#5AA60E] rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUserPlus size="30px" color="white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-pretendard">
          회원가입
        </h1>
        <p className="text-gray-600 font-pretendard">
          First Pitch와 함께 야구의 세계로 떠나보세요!
        </p>
      </header>

      <main>
        <fieldset className="space-y-6">
          <legend className="sr-only">회원 정보 입력</legend>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
            >
              아이디 <span className="text-red-500">*</span>
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
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
            >
              비밀번호 <span className="text-red-500">*</span>
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
                placeholder="영문, 특수문자 사용하여 6자 이상 입력하세요."
                required
                aria-required="true"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
            >
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock color="#989AAA" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard"
                placeholder="비밀번호를 다시 입력하세요."
                required
                aria-required="true"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope color="#989AAA" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={emailVerification.isVerified}
                    className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard ${
                      emailVerification.isVerified
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder="이메일을 입력해주세요."
                    required
                    aria-required="true"
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  radius="xl"
                  onClick={handleSendVerificationCode}
                  disabled={
                    emailVerification.isVerified || emailVerification.isLoading
                  }
                  className="whitespace-nowrap"
                >
                  {emailVerification.isLoading
                    ? "전송중..."
                    : emailVerification.isVerified
                    ? "인증완료"
                    : "이메일 인증"}
                </Button>
              </div>

              {/* 인증 코드 입력 필드 */}
              {emailVerification.isSent && !emailVerification.isVerified && (
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={emailVerification.code}
                      onChange={(e) =>
                        setEmailVerification((prev) => ({
                          ...prev,
                          code: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard"
                      placeholder="인증 코드 6자리를 입력하세요"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    radius="xl"
                    onClick={handleVerifyCode}
                    disabled={emailVerification.isLoading}
                    className="whitespace-nowrap"
                  >
                    {emailVerification.isLoading ? "확인중..." : "코드 확인"}
                  </Button>
                </div>
              )}

              {/* 인증 완료 표시 */}
              {emailVerification.isVerified && (
                <div className="flex items-center space-x-2 text-sm text-[#5AA60E]">
                  <FaCheck />
                  <span>이메일 인증이 완료되었습니다.</span>
                </div>
              )}
            </div>
          </div>

          {/* Nickname Field */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-2 font-pretendard"
            >
              닉네임 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser color="#989AAA" />
              </div>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-0 transition-colors font-pretendard"
                placeholder="나만의 닉네임을 만들어보세요."
                required
                aria-required="true"
              />
            </div>
          </div>
        </fieldset>

        {/* Agreements */}
        <fieldset className="mt-5 space-y-8">
          <legend className="sr-only">약관 동의</legend>

          <div className="space-y-2">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={() => handleAgreementChange("terms")}
                className="mt-1 h-4 w-4 text-[#5AA60E] border-gray-300 rounded focus:ring-[#5AA60E] focus:ring-2"
                required
                aria-required="true"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700 font-pretendard">
                  <span className="text-red-500">*</span> 이용약관에 동의합니다.
                </span>
                <button
                  type="button"
                  onClick={() => window.open("/terms", "_blank")}
                  className="ml-2 text-xs text-[#5AA60E] hover:underline font-medium"
                >
                  [약관 보기]
                </button>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.privacy}
                onChange={() => handleAgreementChange("privacy")}
                className="mt-1 h-4 w-4 text-[#5AA60E] border-gray-300 rounded focus:ring-[#5AA60E] focus:ring-2"
                required
                aria-required="true"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700 font-pretendard">
                  <span className="text-red-500">*</span> 개인정보처리방침에
                  동의합니다.
                </span>
                <button
                  type="button"
                  onClick={() => window.open("/privacy", "_blank")}
                  className="ml-2 text-xs text-[#5AA60E] hover:underline font-medium"
                >
                  [약관 보기]
                </button>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.marketing}
                onChange={() => handleAgreementChange("marketing")}
                className="mt-1 h-4 w-4 text-[#5AA60E] border-gray-300 rounded focus:ring-[#5AA60E] focus:ring-2"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700 font-pretendard">
                  마케팅 정보 수신에 동의합니다. (선택)
                </span>
                <button
                  type="button"
                  onClick={() => window.open("/marketing", "_blank")}
                  className="ml-2 text-xs text-[#5AA60E] hover:underline font-medium"
                >
                  [약관 보기]
                </button>
              </div>
            </label>
          </div>
        </fieldset>
      </main>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 font-pretendard">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <footer className="space-y-4">
        <Button
          type="submit"
          variant="secondary"
          size="md"
          radius="lg"
          className="w-full py-3"
          disabled={isLoading || !emailVerification.isVerified}
          aria-label="회원가입하기"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>회원가입 중...</span>
            </div>
          ) : (
            <>
              <FaUserPlus color="white" />
              회원가입
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-600 font-pretendard">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/auth/login"
            className="text-[#5AA60E] hover:underline font-medium"
          >
            로그인하기
          </Link>
        </p>
      </footer>
    </form>
  );
}
