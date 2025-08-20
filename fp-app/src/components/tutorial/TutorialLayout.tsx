"use client";

import { useState } from "react";
import {
  FaGraduationCap,
  FaMapPin,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  content: {
    question: string;
    explanation: string;
    keyPoints: string[];
  };
}

const TUTORIAL_SECTIONS: TutorialSection[] = [
  {
    id: "basics",
    title: "야구의 기본",
    description: "야구가 무엇인지, 어떻게 하는 게임인지 알아보세요.",
    content: {
      question: "야구란 무엇인가?",
      explanation:
        "야구는 9명으로 구성된 두팀이 번갈아가며 공격과 수비를하는 스포츠 입니다. 공격팀은 공을 쳐서 베이스를 돌아 홈으로 돌아와 득점하고 수비팀은 이를 방해합니다.",
      keyPoints: [
        "9명으로 구성된 팀",
        "공격과 수비를 번갈아 함",
        "홈플레이트로 돌아와야 득점",
        "9이닝으로 구성된 경기",
      ],
    },
  },
  {
    id: "rules",
    title: "경기 규칙",
    description: "야구의 기본적인 경기 규칙과 진행 방식을 배워보세요.",
    content: {
      question: "야구 경기는 어떻게 진행되나요?",
      explanation:
        "야구 경기는 9이닝으로 구성되며, 각 이닝은 상하반으로 나뉩니다. 공격팀은 3아웃이 되기 전까지 공격할 수 있고, 수비팀은 공을 잡아 아웃을 만들어야 합니다.",
      keyPoints: [
        "9이닝으로 진행",
        "상하반으로 나뉨",
        "3아웃까지 공격",
        "스트라이크 3개면 아웃",
      ],
    },
  },
  {
    id: "positions",
    title: "포지션과 역할",
    description: "야구에서 각 포지션의 역할과 중요성을 이해해보세요.",
    content: {
      question: "야구에는 어떤 포지션이 있나요?",
      explanation:
        "야구에는 투수, 포수, 1루수, 2루수, 3루수, 유격수, 좌익수, 중견수, 우익수가 있습니다. 각 포지션마다 고유한 역할과 책임이 있습니다.",
      keyPoints: [
        "투수: 공을 던지는 핵심 선수",
        "포수: 투수와 함께 작전을 짜는 지휘자",
        "내야수: 빠른 반사신경이 필요",
        "외야수: 넓은 수비 범위가 중요",
      ],
    },
  },
  {
    id: "scoring",
    title: "득점 방법",
    description: "야구에서 점수를 얻는 다양한 방법들을 알아보세요.",
    content: {
      question: "야구에서 어떻게 점수를 얻나요?",
      explanation:
        "야구에서 점수는 주자가 1루, 2루, 3루를 거쳐 홈플레이트에 도달할 때 얻습니다. 홈런을 치면 한 번에 4점까지 얻을 수 있고, 안타나 볼넷으로도 점수를 만들 수 있습니다.",
      keyPoints: [
        "홈플레이트 도달 시 득점",
        "홈런으로 한 번에 4점",
        "안타로 주자 진루",
        "볼넷으로 무료 진루",
      ],
    },
  },
];

export default function TutorialLayout() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );

  const currentSection = TUTORIAL_SECTIONS[currentSectionIndex];
  const progress = (completedSections.size / TUTORIAL_SECTIONS.length) * 100;

  const handleNext = () => {
    if (currentSectionIndex < TUTORIAL_SECTIONS.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSections((prev) => new Set([...prev, currentSection.id]));
  };

  const handleSectionClick = (index: number) => {
    setCurrentSectionIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#D9B36C] rounded-full flex items-center justify-center mx-auto mb-8">
            <FaGraduationCap
              size={32}
              className="sm:w-10 sm:h-10"
              color="white"
            />
          </div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D9B36C] mb-12 sm:mb-16 font-pretendard">
            야구 입덕 가이드
          </div>

          {/* Learning Progress Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border-[1.5px] border-[#F2CAB3] w-full mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 font-pretendard">
                학습 진도
              </h3>
              <div className="bg-[#F37C38] text-white text-sm font-bold rounded-lg px-4 py-2">
                {completedSections.size}/{TUTORIAL_SECTIONS.length} 완료
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-5">
              <div
                className="bg-[#F37C38] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="text-left">
              <span className="text-lg font-medium text-[#F37C38] font-pretendard">
                {Math.round(progress)}% 완료
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-stretch mt-12">
          {/* Left Sidebar - Table of Contents */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0 order-2 lg:order-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border-[1.5px] border-[#F2CAB3] h-full">
              <h2 className="text-lg font-bold text-gray-900 mb-4 font-pretendard">
                학습 목차
              </h2>
              <nav className="space-y-4">
                {TUTORIAL_SECTIONS.map((section, index) => (
                  <div
                    key={section.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      index === currentSectionIndex
                        ? "bg-[#F37C38] text-white rounded-lg p-4"
                        : "hover:bg-gray-50 rounded-lg p-4"
                    }`}
                    onClick={() => handleSectionClick(index)}
                  >
                    <h3
                      className={`font-semibold mb-2 font-pretendard ${
                        index === currentSectionIndex
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {section.title}
                    </h3>
                    <p
                      className={`text-sm font-pretendard ${
                        index === currentSectionIndex
                          ? "text-white/90"
                          : "text-gray-600"
                      }`}
                    >
                      {section.description}
                    </p>
                    <div className="flex space-x-1 mt-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === currentSectionIndex
                            ? "bg-white/60"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === currentSectionIndex
                            ? "bg-white/60"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    {completedSections.has(section.id) && (
                      <div className="mt-2 text-right">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            index === currentSectionIndex
                              ? "bg-white/20 text-white"
                              : "bg-green-100 text-green-700"
                          } font-pretendard`}
                        >
                          완료
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 order-1 lg:order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-10 border-[1.5px] border-[#F2CAB3] h-full">
              {/* Content Header */}
              <div className="mb-6 sm:mb-8">
                <div className="text-xs sm:text-sm text-[#F37C38] font-medium mb-2 sm:mb-3 font-pretendard">
                  {currentSection.title}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-pretendard">
                  {currentSection.content.question}
                </h2>
              </div>

              {/* Content Body */}
              <div className="mb-8 sm:mb-10">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 font-pretendard">
                  {currentSection.content.explanation}
                </p>

                {/* Key Points */}
                <div className="bg-[#F8FCF5] rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <FaMapPin className="text-[#F37C38] mr-2 sm:mr-3" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-pretendard">
                      핵심포인트
                    </h3>
                  </div>
                  <ol className="space-y-3 sm:space-y-4">
                    {currentSection.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-[#F37C38] text-white text-xs sm:text-sm font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-3 sm:mr-4 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 font-pretendard text-sm sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <div className="flex space-x-2 sm:space-x-3">
                  {currentSectionIndex > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-pretendard text-sm sm:text-base"
                    >
                      <FaChevronLeft className="mr-1 sm:mr-2" />
                      이전
                    </button>
                  )}
                </div>

                <div className="flex space-x-2 sm:space-x-3">
                  <button
                    onClick={handleComplete}
                    disabled={completedSections.has(currentSection.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium font-pretendard transition-colors text-sm sm:text-base ${
                      completedSections.has(currentSection.id)
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-[#5AA60E] text-white hover:bg-[#5AA60E]/90"
                    }`}
                  >
                    {completedSections.has(currentSection.id)
                      ? "완료됨"
                      : "레슨완료"}
                  </button>

                  {currentSectionIndex < TUTORIAL_SECTIONS.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-[#F37C38] text-white rounded-lg hover:bg-[#F37C38]/90 transition-colors font-pretendard text-sm sm:text-base"
                    >
                      다음
                      <FaChevronRight className="ml-1 sm:ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Bottom spacing for footer */}
      <div className="h-16 sm:h-20 lg:h-24 lg:h-24"></div>
    </div>
  );
}
