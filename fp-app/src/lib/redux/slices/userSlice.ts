import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 사용자 프로필 상태 타입
interface UserProfile {
  id: number;
  username: string;
  email: string;
  nickname: string;
  avatar?: string;
  bio?: string;
  preferences: {
    theme: "light" | "dark";
    language: "ko" | "en";
    notifications: boolean;
  };
}

// 사용자 상태 타입
interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as UserProfile;
    } catch (error) {
      return rejectWithValue("프로필을 가져오는데 실패했습니다.");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return profileData as UserProfile;
    } catch (error) {
      return rejectWithValue("프로필 업데이트에 실패했습니다.");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    updateProfileField: (
      state,
      action: PayloadAction<Partial<UserProfile>>
    ) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    resetProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션 생성자들
export const { clearError, setProfile, updateProfileField, resetProfile } =
  userSlice.actions;

// 셀렉터들
export const selectUserProfile = (state: { user: UserState }) =>
  state.user.profile;
export const selectUserIsLoading = (state: { user: UserState }) =>
  state.user.isLoading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

// 리듀서
export default userSlice.reducer;
