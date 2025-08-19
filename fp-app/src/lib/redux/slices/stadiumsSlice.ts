import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 야구장 타입
interface BaseballStadium {
  id: number;
  name: string;
  city: string;
  capacity: number;
  team: string;
  description: string;
  imageUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  facilities: string[];
  createdAt: string;
  updatedAt: string;
}

// 야구장 목록 응답 타입
interface StadiumsResponse {
  stadiums: BaseballStadium[];
  total: number;
  page: number;
  limit: number;
}

// 야구장 상태 타입
interface StadiumsState {
  stadiums: BaseballStadium[];
  currentStadium: BaseballStadium | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// 초기 상태
const initialState: StadiumsState = {
  stadiums: [],
  currentStadium: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
};

// Async Thunks
export const fetchStadiums = createAsyncThunk(
  "stadiums/fetchStadiums",
  async (
    params: { page?: number; limit?: number; city?: string },
    { rejectWithValue }
  ) => {
    try {
      // API 호출 로직 구현 예정
      return { stadiums: [], total: 0, page: 1, limit: 20 } as StadiumsResponse;
    } catch (error) {
      return rejectWithValue("야구장 정보를 가져오는데 실패했습니다.");
    }
  }
);

export const fetchStadiumById = createAsyncThunk(
  "stadiums/fetchStadiumById",
  async (stadiumId: number, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as BaseballStadium;
    } catch (error) {
      return rejectWithValue("야구장 정보를 가져오는데 실패했습니다.");
    }
  }
);

// Slice
const stadiumsSlice = createSlice({
  name: "stadiums",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStadium: (state, action: PayloadAction<BaseballStadium>) => {
      state.currentStadium = action.payload;
    },
    clearCurrentStadium: (state) => {
      state.currentStadium = null;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    resetStadiums: (state) => {
      state.stadiums = [];
      state.currentStadium = null;
      state.error = null;
      state.pagination = { page: 1, limit: 20, total: 0 };
    },
  },
  extraReducers: (builder) => {
    // Fetch Stadiums
    builder
      .addCase(fetchStadiums.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStadiums.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stadiums = action.payload.stadiums;
        state.pagination.total = action.payload.total;
        state.pagination.page = action.payload.page;
        state.pagination.limit = action.payload.limit;
      })
      .addCase(fetchStadiums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Stadium by ID
    builder
      .addCase(fetchStadiumById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStadiumById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStadium = action.payload;
      })
      .addCase(fetchStadiumById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션 생성자들
export const {
  clearError,
  setCurrentStadium,
  clearCurrentStadium,
  setPagination,
  resetStadiums,
} = stadiumsSlice.actions;

// 셀렉터들
export const selectStadiums = (state: { stadiums: StadiumsState }) =>
  state.stadiums.stadiums;
export const selectCurrentStadium = (state: { stadiums: StadiumsState }) =>
  state.stadiums.currentStadium;
export const selectStadiumsIsLoading = (state: { stadiums: StadiumsState }) =>
  state.stadiums.isLoading;
export const selectStadiumsError = (state: { stadiums: StadiumsState }) =>
  state.stadiums.error;
export const selectStadiumsPagination = (state: { stadiums: StadiumsState }) =>
  state.stadiums.pagination;

// 리듀서
export default stadiumsSlice.reducer;
