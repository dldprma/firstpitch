import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - Authorization 헤더 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    // Redux store에서 accessToken 가져오기 (런타임에 동적으로)
    if (typeof window !== "undefined") {
      try {
        // localStorage에서 직접 가져오기 (임시 해결책)
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
        }
      } catch (error) {
        console.warn("Failed to get access token:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 만료 시 자동 갱신
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 갱신 시도
        const refreshToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("refreshToken="))
          ?.split("=")[1];

        if (refreshToken) {
          const refreshResponse = await axios.post(
            `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
            }/api/auth/refresh`,
            { refreshToken }
          );

          if (
            refreshResponse.data &&
            typeof refreshResponse.data === "object" &&
            "success" in refreshResponse.data
          ) {
            const responseData = refreshResponse.data as {
              success: boolean;
              data?: { accessToken: string };
            };

            if (responseData.success && responseData.data?.accessToken) {
              const { accessToken } = responseData.data;

              // localStorage에 저장 (임시 해결책)
              localStorage.setItem("accessToken", accessToken);

              // 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return apiClient(originalRequest);
            }
          }
        }
      } catch {
        // 토큰 갱신 실패 시 로그아웃
        localStorage.removeItem("accessToken");
        if (typeof window !== "undefined") {
          // 토큰이 만료되었으므로 에러를 던져서 컴포넌트에서 처리하도록 함
          throw new Error("TOKEN_EXPIRED");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
