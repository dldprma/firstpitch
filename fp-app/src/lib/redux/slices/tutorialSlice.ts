import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 튜토리얼 단계 타입
interface TutorialStep {
  id: number;
  title: string;
  description: string;
  content: string;
  order: number;
  isCompleted: boolean;
  requiredSteps?: number[]; // 이 단계를 완료하기 위해 필요한 단계들
  estimatedTime: number; // 분 단위
}

// 튜토리얼 진행 상태 타입
interface TutorialProgress {
  userId: number;
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
  progress: number; // 0-100
  startedAt: string;
  lastAccessedAt: string;
}

// 튜토리얼 상태 타입
interface TutorialState {
  steps: TutorialStep[];
  currentStep: TutorialStep | null;
  progress: TutorialProgress | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: TutorialState = {
  steps: [],
  currentStep: null,
  progress: null,
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchTutorialSteps = createAsyncThunk(
  "tutorial/fetchSteps",
  async (_, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return [] as TutorialStep[];
    } catch (error) {
      return rejectWithValue("튜토리얼 단계를 가져오는데 실패했습니다.");
    }
  }
);

export const fetchTutorialProgress = createAsyncThunk(
  "tutorial/fetchProgress",
  async (userId: number, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as TutorialProgress;
    } catch (error) {
      return rejectWithValue("튜토리얼 진행 상태를 가져오는데 실패했습니다.");
    }
  }
);

export const startTutorial = createAsyncThunk(
  "tutorial/startTutorial",
  async (userId: number, { rejectWithValue }) => {
    try {
      // API 호출 로직 구현 예정
      return {} as TutorialProgress;
    } catch (error) {
      return rejectWithValue("튜토리얼을 시작하는데 실패했습니다.");
    }
  }
);

export const completeTutorialStep = createAsyncThunk(
  "tutorial/completeStep",
  async (stepId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { tutorial: TutorialState };
      const progress = state.tutorial.progress;

      if (!progress) {
        return rejectWithValue("진행 중인 튜토리얼이 없습니다.");
      }

      // 단계 완료 처리 로직
      return { stepId, completedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue("단계 완료 처리에 실패했습니다.");
    }
  }
);

export const updateTutorialProgress = createAsyncThunk(
  "tutorial/updateProgress",
  async (stepId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { tutorial: TutorialState };
      const progress = state.tutorial.progress;

      if (!progress) {
        return rejectWithValue("진행 중인 튜토리얼이 없습니다.");
      }

      // 진행 상태 업데이트 로직
      return { stepId, updatedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue("진행 상태 업데이트에 실패했습니다.");
    }
  }
);

// Slice
const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStep: (state, action: PayloadAction<TutorialStep>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep && state.progress) {
        const currentIndex = state.steps.findIndex(
          (step) => step.id === state.currentStep?.id
        );
        if (currentIndex < state.steps.length - 1) {
          state.currentStep = state.steps[currentIndex + 1];
          state.progress.currentStep = state.currentStep.id;
        }
      }
    },
    previousStep: (state) => {
      if (state.currentStep && state.progress) {
        const currentIndex = state.steps.findIndex(
          (step) => step.id === state.currentStep?.id
        );
        if (currentIndex > 0) {
          state.currentStep = state.steps[currentIndex - 1];
          state.progress.currentStep = state.currentStep.id;
        }
      }
    },
    resetTutorial: (state) => {
      state.currentStep = null;
      state.progress = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Steps
    builder
      .addCase(fetchTutorialSteps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTutorialSteps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.steps = action.payload;
        if (action.payload.length > 0) {
          state.currentStep = action.payload[0];
        }
      })
      .addCase(fetchTutorialSteps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Progress
    builder
      .addCase(fetchTutorialProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      .addCase(fetchTutorialProgress.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Start Tutorial
    builder
      .addCase(startTutorial.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startTutorial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.progress = action.payload;
      })
      .addCase(startTutorial.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Complete Step
    builder
      .addCase(completeTutorialStep.fulfilled, (state, action) => {
        if (state.progress && state.currentStep) {
          const { stepId } = action.payload;
          if (!state.progress.completedSteps.includes(stepId)) {
            state.progress.completedSteps.push(stepId);
            state.progress.progress = Math.round(
              (state.progress.completedSteps.length /
                state.progress.totalSteps) *
                100
            );
          }

          // 현재 단계를 완료된 것으로 표시
          const step = state.steps.find((s) => s.id === stepId);
          if (step) {
            step.isCompleted = true;
          }
        }
      })
      .addCase(completeTutorialStep.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Update Progress
    builder
      .addCase(updateTutorialProgress.fulfilled, (state, action) => {
        if (state.progress) {
          state.progress.lastAccessedAt = action.payload.updatedAt;
        }
      })
      .addCase(updateTutorialProgress.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// 액션 생성자들
export const {
  clearError,
  setCurrentStep,
  nextStep,
  previousStep,
  resetTutorial,
} = tutorialSlice.actions;

// 셀렉터들
export const selectSteps = (state: { tutorial: TutorialState }) =>
  state.tutorial.steps;
export const selectCurrentStep = (state: { tutorial: TutorialState }) =>
  state.tutorial.currentStep;
export const selectProgress = (state: { tutorial: TutorialState }) =>
  state.tutorial.progress;
export const selectTutorialIsLoading = (state: { tutorial: TutorialState }) =>
  state.tutorial.isLoading;
export const selectTutorialError = (state: { tutorial: TutorialState }) =>
  state.tutorial.error;
export const selectProgressPercentage = (state: {
  tutorial: TutorialState;
}) => {
  const progress = state.tutorial.progress;
  return progress ? progress.progress : 0;
};

// 리듀서
export default tutorialSlice.reducer;
