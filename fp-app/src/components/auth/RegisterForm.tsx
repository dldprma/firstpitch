"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "@/lib/hooks/useAuth";
import { RegisterRequest } from "@/lib/types/auth";
import {
  sendVerificationCode,
  verifyEmailCode,
  checkUsername,
} from "@/lib/api/auth";
import { VALIDATION_RULES } from "@/lib/utils/constants";

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
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

  const [localError, setLocalError] = useState("");
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  // 이메일 인증 관련 상태
  const [emailVerification, setEmailVerification] = useState({
    isSent: false,
    isVerified: false,
    code: "",
    isLoading: false,
  });

  // 사용자명 중복 확인 상태
  const [usernameCheck, setUsernameCheck] = useState({
    isChecking: false,
    isAvailable: null as boolean | null,
    message: "",
  });

  // 닉네임 중복 확인 상태
  const [nicknameCheck, setNicknameCheck] = useState({
    isChecking: false,
    isAvailable: null as boolean | null,
    message: "",
  });

  // 비밀번호 유효성 상태
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // 사용자명 유효성 상태
  const [usernameValidation, setUsernameValidation] = useState({
    length: false,
    pattern: false,
  });

  // 닉네임 유효성 상태
  const [nicknameValidation, setNicknameValidation] = useState({
    length: false,
  });

  // 에러가 있을 때 자동으로 에러 메시지 제거
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000); // 5초 후 자동으로 에러 메시지 제거

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    const password = formData.password;
    setPasswordValidation({
      length: password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH,
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  // 사용자명 유효성 검사 및 중복 확인
  useEffect(() => {
    const username = formData.username;
    const isValidLength =
      username.length >= VALIDATION_RULES.USERNAME.MIN_LENGTH &&
      username.length <= VALIDATION_RULES.USERNAME.MAX_LENGTH;
    const isValidPattern = VALIDATION_RULES.USERNAME.PATTERN.test(username);

    setUsernameValidation({
      length: isValidLength,
      pattern: isValidPattern,
    });

    // 유효한 형식일 때만 중복 확인
    if (isValidLength && isValidPattern && username.length > 0) {
      const checkUsernameAvailability = async () => {
        setUsernameCheck({
          isChecking: true,
          isAvailable: null,
          message: "확인 중...",
        });

        try {
          const response = await checkUsername(username);

          if (response.success) {
            if (response.data?.available) {
              setUsernameCheck({
                isChecking: false,
                isAvailable: true,
                message: "사용 가능한 아이디입니다.",
              });
            } else {
              setUsernameCheck({
                isChecking: false,
                isAvailable: false,
                message: "이미 사용 중인 아이디입니다.",
              });
            }
          } else {
            setUsernameCheck({
              isChecking: false,
              isAvailable: null,
              message: response.error || "확인에 실패했습니다.",
            });
          }
        } catch (err) {
          setUsernameCheck({
            isChecking: false,
            isAvailable: null,
            message: "확인 중 오류가 발생했습니다.",
          });
        }
      };

      // 디바운싱 적용 (500ms 후 실행)
      const timer = setTimeout(checkUsernameAvailability, 500);
      return () => clearTimeout(timer);
    } else {
      // 유효하지 않은 형식이면 중복 확인 상태 초기화
      setUsernameCheck({
        isChecking: false,
        isAvailable: null,
        message: "",
      });
    }
  }, [formData.username]);

  // 닉네임 유효성 검사 및 중복 확인
  useEffect(() => {
    const nickname = formData.nickname;
    const isValidLength =
      nickname.length >= VALIDATION_RULES.NICKNAME.MIN_LENGTH &&
      nickname.length <= VALIDATION_RULES.NICKNAME.MAX_LENGTH;

    setNicknameValidation({
      length: isValidLength,
    });

    // 유효한 형식일 때만 중복 확인
    if (isValidLength && nickname.length > 0) {
      const checkNicknameAvailability = async () => {
        setNicknameCheck({
          isChecking: true,
          isAvailable: null,
          message: "확인 중...",
        });

        try {
          // 실제로는 별도의 닉네임 중복 확인 API가 필요하지만
          // 현재는 checkUsername을 사용하여 모의로 처리
          const response = await checkUsername(nickname);

          if (response.success) {
            if (response.data?.available) {
              setNicknameCheck({
                isChecking: false,
                isAvailable: true,
                message: "사용 가능한 닉네임입니다.",
              });
            } else {
              setNicknameCheck({
                isChecking: false,
                isAvailable: false,
                message: "이미 사용 중인 닉네임입니다.",
              });
            }
          } else {
            setNicknameCheck({
              isChecking: false,
              isAvailable: null,
              message: response.error || "확인에 실패했습니다.",
            });
          }
        } catch (err) {
          setNicknameCheck({
            isChecking: false,
            isAvailable: null,
            message: "확인 중 오류가 발생했습니다.",
          });
        }
      };

      // 디바운싱 적용 (500ms 후 실행)
      const timer = setTimeout(checkNicknameAvailability, 500);
      return () => clearTimeout(timer);
    } else {
      // 유효하지 않은 형식이면 중복 확인 상태 초기화
      setNicknameCheck({
        isChecking: false,
        isAvailable: null,
        message: "",
      });
    }
  }, [formData.nickname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 로컬 에러 메시지 제거
    if (localError) {
      setLocalError("");
    }
  };

  const handleAgreementChange = (name: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    // 약관 변경 시 로컬 에러 메시지 제거
    if (localError) {
      setLocalError("");
    }
  };

  // 이메일 인증 코드 전송
  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      setLocalError("이메일을 먼저 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    if (!VALIDATION_RULES.EMAIL.PATTERN.test(formData.email)) {
      setLocalError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setEmailVerification((prev) => ({ ...prev, isLoading: true }));
    setLocalError("");

    try {
      const response = await sendVerificationCode(formData.email);

      if (response.success) {
        setEmailVerification((prev) => ({
          ...prev,
          isSent: true,
          isLoading: false,
        }));
        setLocalError(""); // 성공 시 에러 메시지 제거
      } else {
        setLocalError(response.error || "인증 코드 전송에 실패했습니다.");
        setEmailVerification((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      setLocalError("인증 코드 전송에 실패했습니다. 다시 시도해주세요.");
      setEmailVerification((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    if (!emailVerification.code) {
      setLocalError("인증 코드를 입력해주세요.");
      return;
    }

    setEmailVerification((prev) => ({ ...prev, isLoading: true }));
    setLocalError("");

    try {
      const response = await verifyEmailCode(
        formData.email,
        emailVerification.code
      );

      if (response.success) {
        setEmailVerification((prev) => ({
          ...prev,
          isVerified: true,
          isLoading: false,
        }));
        setLocalError(""); // 성공 시 에러 메시지 제거
      } else {
        setLocalError(response.error || "인증 코드가 일치하지 않습니다.");
        setEmailVerification((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err) {
      setLocalError("인증 코드 확인에 실패했습니다. 다시 시도해주세요.");
      setEmailVerification((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 사용자명 유효성 검사
    if (!usernameValidation.length || !usernameValidation.pattern) {
      setLocalError("사용자명 형식을 확인해주세요.");
      return;
    }

    // 사용자명 중복 확인
    if (usernameCheck.isAvailable !== true) {
      setLocalError("사용 가능한 아이디를 입력해주세요.");
      return;
    }

    // 비밀번호 유효성 검사
    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordValid) {
      setLocalError("비밀번호 요구사항을 모두 충족해주세요.");
      return;
    }

    // 닉네임 유효성 검사
    if (!nicknameValidation.length) {
      setLocalError("닉네임 형식을 확인해주세요.");
      return;
    }

    // 닉네임 중복 확인
    if (nicknameCheck.isAvailable !== true) {
      setLocalError("사용 가능한 닉네임을 입력해주세요.");
      return;
    }

    if (!emailVerification.isVerified) {
      setLocalError("이메일 인증을 완료해주세요.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      setLocalError("필수 약관에 동의해주세요.");
      return;
    }

    try {
      const registerData: RegisterRequest = {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        email: formData.email,
        nickname: formData.nickname,
        emailVerificationCode: emailVerification.code,
        agreeToTerms: agreements.terms,
        agreeToPrivacy: agreements.privacy,
        agreeToMarketing: agreements.marketing,
      };

      const result = await register(registerData);

      if (result.success) {
        setAlertState({
          isOpen: true,
          title: "회원가입",
          message:
            "회원가입이 완료되었습니다! 확인 버튼을 클릭하면 로그인 페이지로 이동합니다.",
          type: "success",
        });
      } else {
        // 에러는 useAuth에서 자동으로 처리됨
        console.error("회원가입 실패:", result.error);
      }
    } catch (err) {
      console.error("회원가입 중 예상치 못한 오류:", err);
    }
  };

  // 현재 표시할 에러 메시지 (Redux 에러 또는 로컬 에러)
  const displayError = error || localError;

  // 성공 메시지가 있으면 에러 메시지 숨김
  const shouldShowError = !alertState.isOpen && displayError;

  const handleAlertConfirm = () => {
    setAlertState({ ...alertState, isOpen: false });
    router.push("/auth/login");
  };

  return (
    <>
      <Alert
        title={alertState.title}
        message={alertState.message}
        isOpen={alertState.isOpen}
        onConfirm={handleAlertConfirm}
        type={alertState.type}
      />
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
              <div className="space-y-2">
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
                    disabled={isLoading}
                  />
                </div>

                {/* 사용자명 유효성 검사 결과 */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`flex items-center space-x-2 ${
                      usernameValidation.length
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {usernameValidation.length ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>
                      {VALIDATION_RULES.USERNAME.MIN_LENGTH}~
                      {VALIDATION_RULES.USERNAME.MAX_LENGTH}자
                    </span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      usernameValidation.pattern
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {usernameValidation.pattern ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>영문, 숫자, _만 사용</span>
                  </div>
                </div>

                {/* 사용자명 중복 확인 결과 */}
                {usernameCheck.message && (
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      usernameCheck.isAvailable === true
                        ? "text-[#5AA60E]"
                        : usernameCheck.isAvailable === false
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {usernameCheck.isAvailable === true ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : usernameCheck.isAvailable === false ? (
                      <FaTimes className="text-red-600" />
                    ) : null}
                    <span>{usernameCheck.message}</span>
                  </div>
                )}
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
              <div className="space-y-2">
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
                    placeholder={`${VALIDATION_RULES.PASSWORD.MIN_LENGTH}자 이상, 소문자, 숫자, 특수문자 포함`}
                    required
                    aria-required="true"
                    disabled={isLoading}
                  />
                </div>

                {/* 비밀번호 유효성 검사 결과 */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className={`flex items-center space-x-2 ${
                      passwordValidation.length
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordValidation.length ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>{VALIDATION_RULES.PASSWORD.MIN_LENGTH}자 이상</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      passwordValidation.lowercase
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordValidation.lowercase ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>소문자 포함</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      passwordValidation.number
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordValidation.number ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>숫자 포함</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      passwordValidation.special
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordValidation.special ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>특수문자 포함</span>
                  </div>
                </div>
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
                  disabled={isLoading}
                />
              </div>

              {/* 비밀번호 일치 여부 표시 */}
              {formData.confirmPassword && (
                <div
                  className={`flex items-center space-x-2 text-sm mt-2 ${
                    formData.password === formData.confirmPassword
                      ? "text-[#5AA60E]"
                      : "text-red-600"
                  }`}
                >
                  {formData.password === formData.confirmPassword ? (
                    <FaCheck className="text-[#5AA60E]" />
                  ) : (
                    <FaTimes className="text-red-600" />
                  )}
                  <span>
                    {formData.password === formData.confirmPassword
                      ? "비밀번호가 일치합니다."
                      : "비밀번호가 일치하지 않습니다."}
                  </span>
                </div>
              )}
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
                      disabled={emailVerification.isVerified || isLoading}
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
                      emailVerification.isVerified ||
                      emailVerification.isLoading ||
                      isLoading
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
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      radius="xl"
                      onClick={handleVerifyCode}
                      disabled={emailVerification.isLoading || isLoading}
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
              <div className="space-y-2">
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
                    disabled={isLoading}
                  />
                </div>

                {/* 닉네임 유효성 검사 결과 */}
                <div className="text-xs">
                  <div
                    className={`flex items-center space-x-2 ${
                      nicknameValidation.length
                        ? "text-[#5AA60E]"
                        : "text-gray-500"
                    }`}
                  >
                    {nicknameValidation.length ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : (
                      <FaTimes className="text-gray-400" />
                    )}
                    <span>
                      {VALIDATION_RULES.NICKNAME.MIN_LENGTH}~
                      {VALIDATION_RULES.NICKNAME.MAX_LENGTH}자
                    </span>
                  </div>
                </div>

                {/* 닉네임 중복 확인 결과 */}
                {nicknameCheck.message && (
                  <div
                    className={`flex items-center space-x-2 text-sm ${
                      nicknameCheck.isAvailable === true
                        ? "text-[#5AA60E]"
                        : nicknameCheck.isAvailable === false
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {nicknameCheck.isAvailable === true ? (
                      <FaCheck className="text-[#5AA60E]" />
                    ) : nicknameCheck.isAvailable === false ? (
                      <FaTimes className="text-red-600" />
                    ) : null}
                    <span>{nicknameCheck.message}</span>
                  </div>
                )}
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
                  disabled={isLoading}
                />
                <div className="flex-1">
                  <span className="text-sm text-gray-700 font-pretendard">
                    <span className="text-red-500">*</span> 이용약관에
                    동의합니다.
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
        {displayError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 font-pretendard">
            {displayError}
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
            disabled={
              isLoading ||
              !emailVerification.isVerified ||
              usernameCheck.isAvailable !== true ||
              nicknameCheck.isAvailable !== true ||
              !Object.values(passwordValidation).every(Boolean) ||
              !usernameValidation.length ||
              !usernameValidation.pattern ||
              !nicknameValidation.length
            }
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
    </>
  );
}
