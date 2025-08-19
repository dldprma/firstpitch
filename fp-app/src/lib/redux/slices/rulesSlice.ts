import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 야구 규칙 타입
interface BaseballRule {
  id: number;
  title: string;
  description: string;
  category: "batting" | "pitching" | "fielding" | "base-running" | "general";
  difficulty: "beginner" | "intermediate" | "advanced";
  examples?: string[];
  createdAt: string;
  updatedAt: string;
}

// 규칙 목록 응답 타입
interface RulesResponse {
  rules: BaseballRule[];
  total: number;
  page: number;
  limit: number;
}

// 규칙 상태 타입
interface RulesState {
  rules: BaseballRule[];
  currentRule: BaseballRule | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// 초기 상태
const initialState: RulesState = {
  rules: [],
  currentRule: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
};

// Async Thunks
export const fetchRules = createAsyncThunk(
  "rules/fetchRules",
  async (
    params: { page?: number; limit?: number; category?: string },
    { rejectWithValue }
  ) => {
    try {
      // API 호출 로직 구현 예정
      return { rules: [], total: 0, page: 1, limit: 20 } as RulesResponse;
    } catch (error) {
      return rejectWithValue("규칙을 가져오는데 실패했습니다.");
    }
  }
);

export const fetchRuleById = createAsyncThunk(
  "rules/fetchRuleById",
  async (ruleId: number, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as BaseballRule;
    } catch (error) {
      return rejectWithValue("규칙을 가져오는데 실패했습니다.");
    }
  }
);

// Slice
const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentRule: (state, action: PayloadAction<BaseballRule>) => {
      state.currentRule = action.payload;
    },
    clearCurrentRule: (state) => {
      state.currentRule = null;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    resetRules: (state) => {
      state.rules = [];
      state.currentRule = null;
      state.error = null;
      state.pagination = { page: 1, limit: 20, total: 0 };
    },
  },
  extraReducers: (builder) => {
    // Fetch Rules
    builder
      .addCase(fetchRules.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rules = action.payload.rules;
        state.pagination.total = action.payload.total;
        state.pagination.page = action.payload.page;
        state.pagination.limit = action.payload.limit;
      })
      .addCase(fetchRules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Rule by ID
    builder
      .addCase(fetchRuleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRuleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRule = action.payload;
      })
      .addCase(fetchRuleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션 생성자들
export const {
  clearError,
  setCurrentRule,
  clearCurrentRule,
  setPagination,
  resetRules,
} = rulesSlice.actions;

// 셀렉터들
export const selectRules = (state: { rules: RulesState }) => state.rules.rules;
export const selectCurrentRule = (state: { rules: RulesState }) =>
  state.rules.currentRule;
export const selectRulesIsLoading = (state: { rules: RulesState }) =>
  state.rules.isLoading;
export const selectRulesError = (state: { rules: RulesState }) =>
  state.rules.error;
export const selectRulesPagination = (state: { rules: RulesState }) =>
  state.rules.pagination;

// 리듀서
export default rulesSlice.reducer;
