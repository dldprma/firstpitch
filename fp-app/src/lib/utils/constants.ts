// API 엔드포인트
export const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  REFRESH: "/api/auth/refresh",
  PROFILE: "/api/auth/profile",
  SEND_VERIFICATION: "/api/auth/send-verification",
  VERIFY_EMAIL: "/api/auth/verify-email",
  CHECK_USERNAME: "/api/users/check-username",
  CHECK_EMAIL: "/api/users/check-email",
} as const;

// 토큰 관련 상수
export const TOKEN_CONFIG = {
  ACCESS_TOKEN_EXPIRY: 15 * 60 * 1000, // 15분
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7일
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5분 전에 갱신
} as const;

// 쿠키 설정
export const COOKIE_CONFIG = {
  REFRESH_TOKEN: "refreshToken",
  HTTP_ONLY: true,
  SECURE: process.env.NODE_ENV === "production",
  SAME_SITE: "strict" as const,
  MAX_AGE: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY,
} as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

// 에러 메시지
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "아이디 또는 비밀번호가 올바르지 않습니다.",
  USER_NOT_FOUND: "존재하지 않는 사용자입니다.",
  ACCOUNT_LOCKED: "계정이 잠겼습니다. 관리자에게 문의하세요.",
  TOKEN_EXPIRED: "인증이 만료되었습니다. 다시 로그인해주세요.",
  TOKEN_INVALID: "유효하지 않은 인증입니다.",
  NETWORK_ERROR: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
  SERVER_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  DUPLICATE_USERNAME: "이미 사용 중인 아이디입니다.",
  DUPLICATE_EMAIL: "이미 사용 중인 이메일입니다.",
  EMAIL_NOT_VERIFIED: "이메일 인증을 완료해주세요.",
  WEAK_PASSWORD: "비밀번호는 8자 이상이어야 합니다.",
} as const;

// 성공 메시지
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "로그인되었습니다.",
  REGISTER_SUCCESS: "회원가입이 완료되었습니다.",
  LOGOUT_SUCCESS: "로그아웃되었습니다.",
  EMAIL_VERIFIED: "이메일 인증이 완료되었습니다.",
  PASSWORD_CHANGED: "비밀번호가 변경되었습니다.",
} as const;

// 유효성 검사 규칙 (백엔드와 동일)
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 20,
    PATTERN: /^[a-z0-9_]+$/, // 소문자+숫자+언더바만
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
    PATTERN: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]+$/, // 소문자+숫자+특수문자
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  NICKNAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
  },
  EMAIL_VERIFICATION_CODE: {
    LENGTH: 6,
    PATTERN: /^[0-9]{6}$/,
  },
} as const;
