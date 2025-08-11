"use client";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100); // 적절한 지연 시간

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5AA60E] mx-auto mb-4"></div>
              <p className="text-gray-600">로딩 중...</p>
            </div>
          </div>
        }
        persistor={persistor}
        onBeforeLift={() => {
          // PersistGate가 상태를 복원한 후 실행
          setTimeout(() => setIsHydrated(true), 50);
        }}
      >
        {isHydrated ? (
          children
        ) : (
          <div className="min-h-screen bg-gradient-to-b from-[#E5F5D6] to-[#F5F5F5] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5AA60E] mx-auto mb-4"></div>
              <p className="text-gray-600">상태 복원 중...</p>
            </div>
          </div>
        )}
      </PersistGate>
    </Provider>
  );
}
