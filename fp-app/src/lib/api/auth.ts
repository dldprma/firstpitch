import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ApiResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserSearchResult,
  UserListResponse,
} from "@/lib/types/auth";
import { AUTH_ENDPOINTS, AUTH_ERROR_MESSAGES } from "@/lib/utils/constants";
import apiClient from "./client";

// 로그인 API
export const login = async (
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const errorData = error.response.data as any;
      return {
        success: false,
        error: errorData.message || AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 회원가입 API
export const register = async (
  userData: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const errorData = error.response.data as any;
      return {
        success: false,
        error: errorData.message || AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 로그아웃 API
export const logout = async (): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    return response.data as ApiResponse<{ message: string }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ message: string }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 토큰 갱신 API
export const refreshToken = async (
  refreshData: RefreshTokenRequest
): Promise<ApiResponse<RefreshTokenResponse>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH, refreshData);
    return response.data as ApiResponse<RefreshTokenResponse>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<RefreshTokenResponse>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 토큰 검증 API
export const verifyToken = async (): Promise<
  ApiResponse<{ isValid: boolean }>
> => {
  try {
    const response = await apiClient.get(AUTH_ENDPOINTS.VERIFY);
    return response.data as ApiResponse<{ isValid: boolean }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ isValid: boolean }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 이메일 인증 코드 발송 API
export const sendVerificationCode = async (
  email: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.SEND_VERIFICATION, {
      email,
    });
    // 백엔드 응답 형식에 맞춤: { message: '...' }
    return {
      success: true,
      data: { message: response.data.message },
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const errorData = error.response.data as any;
      return {
        success: false,
        error: errorData.message || AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 이메일 인증 코드 확인 API
export const verifyEmailCode = async (
  email: string,
  code: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_EMAIL, {
      email,
      code,
    });
    // 백엔드 응답 형식에 맞춤: { message: '...' }
    return {
      success: true,
      data: { message: response.data.message },
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const errorData = error.response.data as any;
      return {
        success: false,
        error: errorData.message || AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 아이디 중복 확인 API
export const checkUsername = async (
  username: string
): Promise<ApiResponse<{ available: boolean }>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.CHECK_USERNAME, {
      username,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const errorData = error.response.data as any;
      return {
        success: false,
        error: errorData.message || AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 이메일 중복 확인 API
export const checkEmail = async (
  email: string
): Promise<ApiResponse<{ available: boolean }>> => {
  try {
    const response = await apiClient.post(AUTH_ENDPOINTS.CHECK_EMAIL, {
      email,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      const errorData = error.response.data as any;
      return {
        success: false,
        error: errorData.message || AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 사용자 프로필 업데이트 API
export const updateUserProfile = async (
  profileData: UpdateProfileRequest
): Promise<ApiResponse<{ user: unknown }>> => {
  try {
    const response = await apiClient.put("/api/users/profile", profileData);
    return response.data as ApiResponse<{ user: unknown }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ user: unknown }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 비밀번호 변경 API
export const changePassword = async (
  passwordData: ChangePasswordRequest
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.put("/api/users/password", passwordData);
    return response.data as ApiResponse<{ message: string }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ message: string }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 사용자 검색 API
export const searchUsers = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<UserListResponse>> => {
  try {
    const response = await apiClient.get(
      `/api/users/search?q=${query}&page=${page}&limit=${limit}`
    );
    return response.data as ApiResponse<UserListResponse>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<UserListResponse>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 특정 사용자 정보 가져오기 API
export const getUserById = async (
  userId: number
): Promise<ApiResponse<{ user: UserSearchResult }>> => {
  try {
    const response = await apiClient.get(`/api/users/${userId}`);
    return response.data as ApiResponse<{ user: UserSearchResult }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ user: UserSearchResult }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 사용자 팔로우 API
export const followUser = async (
  userId: number
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.post(`/api/users/${userId}/follow`);
    return response.data as ApiResponse<{ message: string }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ message: string }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 사용자 언팔로우 API
export const unfollowUser = async (
  userId: number
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await apiClient.delete(`/api/users/${userId}/follow`);
    return response.data as ApiResponse<{ message: string }>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<{ message: string }>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 팔로워 목록 가져오기 API
export const getFollowers = async (
  userId: number,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<UserListResponse>> => {
  try {
    const response = await apiClient.get(
      `/api/users/${userId}/followers?page=${page}&limit=${limit}`
    );
    return response.data as ApiResponse<UserListResponse>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<UserListResponse>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 팔로잉 목록 가져오기 API
export const getFollowing = async (
  userId: number,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<UserListResponse>> => {
  try {
    const response = await apiClient.get(
      `/api/users/${userId}/following?page=${page}&limit=${limit}`
    );
    return response.data as ApiResponse<UserListResponse>;
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response
    ) {
      return error.response.data as ApiResponse<UserListResponse>;
    }
    return {
      success: false,
      error: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};
