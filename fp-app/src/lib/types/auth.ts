// 사용자 정보 타입
export interface User {
  id: number; // 데이터베이스 고유 ID (number 타입)
  username: string; // 사용자명 (로그인용)
  email: string; // 이메일
  nickname: string; // 닉네임
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
}

// 로그인 요청 타입
export interface LoginRequest {
  username: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 회원가입 요청 타입
export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  nickname: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToMarketing: boolean;
}

// 회원가입 응답 타입
export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 토큰 갱신 요청 타입
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 타입
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 인증 상태 타입
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// API 응답 기본 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 인증 에러 타입
export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

// 사용자 프로필 업데이트 요청 타입
export interface UpdateProfileRequest {
  nickname?: string;
  marketingConsent?: boolean;
}

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// 사용자 검색 결과 타입
export interface UserSearchResult {
  id: number; // number 타입으로 변경
  username: string;
  nickname: string;
  email: string;
}

// 사용자 목록 응답 타입
export interface UserListResponse {
  users: UserSearchResult[];
  total: number;
  page: number;
  limit: number;
}
