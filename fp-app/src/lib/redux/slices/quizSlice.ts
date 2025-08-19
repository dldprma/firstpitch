import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// 퀴즈 문제 타입
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "batting" | "pitching" | "fielding" | "base-running" | "general";
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
}

// 퀴즈 세션 타입
interface QuizSession {
  id: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: number[];
  score: number;
  totalPoints: number;
  startTime: string;
  endTime?: string;
  isCompleted: boolean;
}

// 퀴즈 결과 타입
interface QuizResult {
  sessionId: string;
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // 초 단위
  category: string;
  difficulty: string;
  completedAt: string;
}

// 퀴즈 상태 타입
interface QuizState {
  currentSession: QuizSession | null;
  questions: QuizQuestion[];
  results: QuizResult[];
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: QuizState = {
  currentSession: null,
  questions: [],
  results: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchQuizQuestions = createAsyncThunk(
  "quiz/fetchQuestions",
  async (
    params: { category?: string; difficulty?: string; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      // API 호출 로직 구현 예정
      return [] as QuizQuestion[];
    } catch (error) {
      return rejectWithValue("퀴즈 문제를 가져오는데 실패했습니다.");
    }
  }
);

export const startQuiz = createAsyncThunk(
  "quiz/startQuiz",
  async (
    params: { category?: string; difficulty?: string; questionCount: number },
    { rejectWithValue }
  ) => {
    try {
      // API 호출 로직 구현 예정
      return {} as QuizSession;
    } catch (error) {
      return rejectWithValue("퀴즈를 시작하는데 실패했습니다.");
    }
  }
);

export const submitQuizAnswer = createAsyncThunk(
  "quiz/submitAnswer",
  async (answer: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { quiz: QuizState };
      const session = state.quiz.currentSession;

      if (!session) {
        return rejectWithValue("진행 중인 퀴즈가 없습니다.");
      }

      // 답변 처리 로직
      return { answer, isCorrect: false, points: 0 };
    } catch (error) {
      return rejectWithValue("답변 제출에 실패했습니다.");
    }
  }
);

export const finishQuiz = createAsyncThunk(
  "quiz/finishQuiz",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { quiz: QuizState };
      const session = state.quiz.currentSession;

      if (!session) {
        return rejectWithValue("진행 중인 퀴즈가 없습니다.");
      }

      // 퀴즈 완료 처리 로직
      return {} as QuizResult;
    } catch (error) {
      return rejectWithValue("퀴즈 완료 처리에 실패했습니다.");
    }
  }
);

// Slice
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      if (state.currentSession) {
        state.currentSession.currentQuestionIndex = action.payload;
      }
    },
    resetQuiz: (state) => {
      state.currentSession = null;
      state.error = null;
    },
    clearQuestions: (state) => {
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Questions
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Start Quiz
    builder
      .addCase(startQuiz.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = action.payload;
      })
      .addCase(startQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Submit Answer
    builder
      .addCase(submitQuizAnswer.fulfilled, (state, action) => {
        if (state.currentSession) {
          const { answer } = action.payload;
          state.currentSession.answers[
            state.currentSession.currentQuestionIndex
          ] = answer;

          // 다음 문제로 이동
          if (
            state.currentSession.currentQuestionIndex <
            state.currentSession.questions.length - 1
          ) {
            state.currentSession.currentQuestionIndex++;
          }
        }
      })
      .addCase(submitQuizAnswer.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Finish Quiz
    builder
      .addCase(finishQuiz.fulfilled, (state, action) => {
        if (state.currentSession) {
          state.currentSession.isCompleted = true;
          state.currentSession.endTime = new Date().toISOString();
          state.results.push(action.payload);
        }
      })
      .addCase(finishQuiz.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// 액션 생성자들
export const { clearError, setCurrentQuestion, resetQuiz, clearQuestions } =
  quizSlice.actions;

// 셀렉터들
export const selectCurrentSession = (state: { quiz: QuizState }) =>
  state.quiz.currentSession;
export const selectQuestions = (state: { quiz: QuizState }) =>
  state.quiz.questions;
export const selectResults = (state: { quiz: QuizState }) => state.quiz.results;
export const selectQuizIsLoading = (state: { quiz: QuizState }) =>
  state.quiz.isLoading;
export const selectQuizError = (state: { quiz: QuizState }) => state.quiz.error;
export const selectCurrentQuestion = (state: { quiz: QuizState }) => {
  const session = state.quiz.currentSession;
  if (session && session.questions.length > 0) {
    return session.questions[session.currentQuestionIndex];
  }
  return null;
};

// 리듀서
export default quizSlice.reducer;
