import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 약관 타입
interface Terms {
  id: number;
  title: string;
  content: string;
  version: string;
  type: "terms" | "privacy" | "marketing";
  isActive: boolean;
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
}

// 약관 목록 응답 타입
interface TermsResponse {
  terms: Terms[];
  total: number;
  page: number;
  limit: number;
}

// 약관 상태 타입
interface TermsState {
  terms: Terms[];
  currentTerms: Terms | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// 초기 상태
const initialState: TermsState = {
  terms: [],
  currentTerms: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
};

// Async Thunks
export const fetchTerms = createAsyncThunk(
  "terms/fetchTerms",
  async (
    params: { page?: number; limit?: number; type?: string },
    { rejectWithValue }
  ) => {
    try {
      // API 호출 로직 구현 예정
      return { terms: [], total: 0, page: 1, limit: 20 } as TermsResponse;
    } catch (error) {
      return rejectWithValue("약관을 가져오는데 실패했습니다.");
    }
  }
);

export const fetchTermsById = createAsyncThunk(
  "terms/fetchTermsById",
  async (termsId: number, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as Terms;
    } catch (error) {
      return rejectWithValue("약관을 가져오는데 실패했습니다.");
    }
  }
);

export const fetchLatestTerms = createAsyncThunk(
  "terms/fetchLatestTerms",
  async (type: "terms" | "privacy" | "marketing", { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as Terms;
    } catch (error) {
      return rejectWithValue("최신 약관을 가져오는데 실패했습니다.");
    }
  }
);

// Slice
const termsSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentTerms: (state, action: PayloadAction<Terms>) => {
      state.currentTerms = action.payload;
    },
    clearCurrentTerms: (state) => {
      state.currentTerms = null;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    resetTerms: (state) => {
      state.terms = [];
      state.currentTerms = null;
      state.error = null;
      state.pagination = { page: 1, limit: 20, total: 0 };
    },
  },
  extraReducers: (builder) => {
    // Fetch Terms
    builder
      .addCase(fetchTerms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.terms = action.payload.terms;
        state.pagination.total = action.payload.total;
        state.pagination.page = action.payload.page;
        state.pagination.limit = action.payload.limit;
      })
      .addCase(fetchTerms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Terms by ID
    builder
      .addCase(fetchTermsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTermsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTerms = action.payload;
      })
      .addCase(fetchTermsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Latest Terms
    builder
      .addCase(fetchLatestTerms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestTerms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTerms = action.payload;
      })
      .addCase(fetchLatestTerms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션 생성자들
export const {
  clearError,
  setCurrentTerms,
  clearCurrentTerms,
  setPagination,
  resetTerms,
} = termsSlice.actions;

// 셀렉터들
export const selectTerms = (state: { terms: TermsState }) => state.terms.terms;
export const selectCurrentTerms = (state: { terms: TermsState }) =>
  state.terms.currentTerms;
export const selectTermsIsLoading = (state: { terms: TermsState }) =>
  state.terms.isLoading;
export const selectTermsError = (state: { terms: TermsState }) =>
  state.terms.error;
export const selectTermsPagination = (state: { terms: TermsState }) =>
  state.terms.pagination;

// 리듀서
export default termsSlice.reducer;
