import { STORAGE_KEYS, TOKEN_CONFIG } from "@/lib/utils/constants";

// JWT 토큰 디코딩 (페이로드만)
export const decodeToken = (token: string): any => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

// 토큰 만료 시간 확인
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// 토큰 갱신 필요 여부 확인
export const shouldRefreshToken = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Date.now() / 1000;
  const refreshThreshold = 5 * 60; // 5분 전
  return decoded.exp - currentTime < refreshThreshold;
};

// 사용자 정보 저장 (localStorage)
export const setUser = (user: any): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user to localStorage:", error);
  }
};

// 사용자 정보 가져오기 (localStorage)
export const getUser = (): any | null => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to get user from localStorage:", error);
    return null;
  }
};

// 사용자 정보 제거 (localStorage)
export const removeUser = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error("Failed to remove user from localStorage:", error);
  }
};

// accessToken은 메모리에서만 관리 (localStorage 저장 안함)
export const setAccessToken = (token: string): void => {
  // 메모리 상태에서만 관리 (Redux store)
  // localStorage에는 저장하지 않음
};

// accessToken 제거 (메모리 상태만)
export const removeAccessToken = (): void => {
  // 메모리 상태에서만 제거 (Redux store)
  // localStorage에는 저장하지 않음
};

// 인증 데이터 정리
export const clearAuthData = (): void => {
  removeUser();
  // accessToken은 Redux store에서 관리되므로 여기서는 제거하지 않음
};

// Authorization 헤더 생성
export const getAuthHeader = (): { Authorization: string } | {} => {
  // Redux store에서 accessToken을 가져와야 함
  // 이 함수는 API 호출 시 사용되며, Redux store의 token을 사용
  return {};
};

// CSRF 토큰 가져오기 (필요한 경우)
export const getCSRFToken = (): string | null => {
  // CSRF 토큰이 필요한 경우 구현
  return null;
};

// 비밀번호 강도 검사
export const validatePasswordStrength = (
  password: string
): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 6) {
    score += 1;
  } else {
    feedback.push("비밀번호는 6자 이상이어야 합니다.");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("소문자를 포함해야 합니다.");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("숫자를 포함해야 합니다.");
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("특수문자를 포함해야 합니다.");
  }

  return {
    isValid: score >= 4,
    score,
    feedback,
  };
};

// 이메일 형식 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 사용자명 형식 검증
export const validateUsername = (
  username: string
): {
  isValid: boolean;
  feedback: string[];
} => {
  const feedback: string[] = [];

  if (username.length < 3) {
    feedback.push("아이디는 3자 이상이어야 합니다.");
  }

  if (username.length > 10) {
    feedback.push("아이디는 10자 이하여야 합니다.");
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    feedback.push("아이디는 영문, 숫자, 언더스코어만 사용 가능합니다.");
  }

  return {
    isValid: feedback.length === 0,
    feedback,
  };
};
