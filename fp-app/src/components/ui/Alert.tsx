import React from "react";
import Button from "./Button";

interface AlertProps {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  confirmText?: string;
  type?: "success" | "error" | "info" | "warning";
}

export default function Alert({
  title,
  message,
  isOpen,
  onConfirm,
  confirmText = "확인",
  type = "info",
}: AlertProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          border: "border-green-200",
          bg: "bg-green-50",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
          buttonColor: "bg-green-600 hover:bg-green-700",
        };
      case "error":
        return {
          border: "border-red-200",
          bg: "bg-red-50",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
          buttonColor: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          border: "border-yellow-200",
          bg: "bg-yellow-50",
          titleColor: "text-yellow-800",
          messageColor: "text-yellow-700",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700",
        };
      default:
        return {
          border: "border-blue-200",
          bg: "bg-blue-50",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4 p-6 rounded-lg shadow-xl bg-white border border-gray-200">
        {/* 제목 */}
        <div className="text-left mb-4">
          <h3 className="text-lg font-semibold text-gray-900 font-pretendard">
            {title}
          </h3>
          <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
        </div>

        {/* 메시지 */}
        <div className="text-center mb-6">
          <p className="text-gray-900 font-pretendard text-base leading-relaxed">
            {message}
          </p>
        </div>

        {/* 확인 버튼 */}
        <div className="text-center">
          <Button
            onClick={onConfirm}
            className="bg-[#5AA60E] hover:bg-[#4A950D] text-white px-6 py-3 rounded-lg font-medium font-pretendard text-base"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
