import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUserToken,
  verifyUserToken,
  clearError,
  initializeAuth,
  selectUser,
  selectAccessToken,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
} from "@/lib/redux/slices/authSlice";
import { RegisterRequest } from "@/lib/types/auth";

// 인증 상태 관리 훅
export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 상태 선택
  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  // 컴포넌트 마운트 시 인증 초기화
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // 로그인 처리
  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    const result = await dispatch(loginUser(credentials));

    if (loginUser.fulfilled.match(result)) {
      router.push("/"); // 홈으로 리다이렉트
      return { success: true };
    } else {
      return { success: false, error: result.payload as string };
    }
  };

  // 회원가입 처리
  const handleRegister = async (userData: RegisterRequest) => {
    const result = await dispatch(registerUser(userData));

    if (registerUser.fulfilled.match(result)) {
      router.push("/"); // 홈으로 리다이렉트
      return { success: true };
    } else {
      return { success: false, error: result.payload as string };
    }
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/auth/login");
  };

  // 에러 초기화
  const handleClearError = () => {
    dispatch(clearError());
  };

  // 토큰 갱신
  const handleRefreshToken = async () => {
    return await dispatch(refreshUserToken());
  };

  // 토큰 검증
  const handleVerifyToken = async () => {
    return await dispatch(verifyUserToken());
  };

  return {
    // State
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
    verifyToken: handleVerifyToken,
    clearError: handleClearError,
  };
};

// 인증이 필요한 페이지를 위한 훅
export const useRequireAuth = (redirectTo: string = "/auth/login") => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
};

// 인증이 되지 않은 사용자를 위한 훅 (로그인/회원가입 페이지용)
export const useRequireGuest = (redirectTo: string = "/") => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
};

// 토큰 갱신 훅
export const useTokenRefresh = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const accessToken = useAppSelector(selectAccessToken);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      // 토큰 갱신이 필요한지 주기적으로 확인
      const interval = setInterval(() => {
        dispatch(refreshUserToken());
      }, 4 * 60 * 1000); // 4분마다

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, accessToken, dispatch]);

  return { refreshToken: () => dispatch(refreshUserToken()) };
};

// 사용자 ID 관련 훅
export const useUserId = () => {
  const user = useAppSelector(selectUser);

  const getCurrentUserId = () => user?.id || null;

  const isCurrentUser = (userId: number) => (user ? user.id === userId : false);

  const getUserInfo = (userId: number) => {
    if (user && user.id === userId) {
      return user;
    }
    return null;
  };

  return {
    currentUserId: getCurrentUserId(),
    isCurrentUser,
    getUserById: getUserInfo,
  };
};
