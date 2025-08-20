import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  User,
  LoginRequest,
  RegisterRequest,
} from "@/lib/types/auth";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  refreshToken as refreshTokenApi,
  verifyToken as verifyTokenApi,
} from "@/lib/api/auth";
import { AUTH_ERROR_MESSAGES } from "@/lib/utils/constants";

// 초기 상태 - 서버와 클라이언트 간 일관성 보장
const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      if (response.success && response.data) {
        const { user, accessToken } = response.data;
        return { user, accessToken };
      } else {
        return rejectWithValue(
          response.error || AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS
        );
      }
    } catch (error) {
      return rejectWithValue(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData);
      if (response.success && response.data) {
        const { user, accessToken } = response.data;
        return { user, accessToken };
      } else {
        return rejectWithValue(
          response.error || AUTH_ERROR_MESSAGES.SERVER_ERROR
        );
      }
    } catch (error) {
      return rejectWithValue(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      if (!response.success) {
        console.error("Logout API error:", response.error);
        return rejectWithValue(
          response.error || AUTH_ERROR_MESSAGES.SERVER_ERROR
        );
      }
    } catch (error) {
      console.error("Logout API error:", error);
      return rejectWithValue(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      // refreshToken은 HTTP-only 쿠키에서 자동으로 전송됨
      const response = await refreshTokenApi({ refreshToken: "" }); // Dummy refreshToken for type
      if (response.success && response.data) {
        const { accessToken } = response.data;
        return { accessToken };
      } else {
        return rejectWithValue(
          response.error || AUTH_ERROR_MESSAGES.TOKEN_EXPIRED
        );
      }
    } catch (error) {
      return rejectWithValue(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
);

export const verifyUserToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await verifyTokenApi();
      if (response.success && response.data) {
        return { isValid: response.data.isValid };
      } else {
        return rejectWithValue(
          response.error || AUTH_ERROR_MESSAGES.TOKEN_INVALID
        );
      }
    } catch (error) {
      return rejectWithValue(AUTH_ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    initializeAuth: (state) => {
      // 페이지 새로고침 시 Redux Persist에서 상태 복원
      // localStorage는 사용하지 않음
    },
    resetAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; // 회원가입 후에는 로그인 상태가 아님
        state.user = null; // 회원가입 후에는 사용자 정보를 저장하지 않음
        state.accessToken = null; // 회원가입 후에는 토큰을 저장하지 않음
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.error = action.payload as string;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true; // 토큰 갱신 성공 시 인증 상태 유지
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.accessToken = null;
        state.isAuthenticated = false;
        state.user = null; // 토큰 갱신 실패 시 사용자 정보도 초기화
        state.error = action.payload as string;
      })
      .addCase(verifyUserToken.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isValid;
        state.error = null;
      })
      .addCase(verifyUserToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  updateUser,
  updateAccessToken,
  initializeAuth,
  resetAuth,
} = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
