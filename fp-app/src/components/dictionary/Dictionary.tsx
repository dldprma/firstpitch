"use client";

import React, { useMemo, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";

type Difficulty = "전체" | "초급" | "중급" | "고급";
type Category =
  | "전체"
  | "기본용어"
  | "타격용어"
  | "수비용어"
  | "투수용어"
  | "전술용어"
  | "기록용어";

interface DictionaryEntry {
  id: string;
  term: string;
  category: Exclude<Category, "전체">;
  difficulty: Exclude<Difficulty, "전체">;
  meaning: string;
  example: string;
}

const DIFFICULTY_COLORS: Record<Exclude<Difficulty, "전체">, string> = {
  초급: "bg-[#E9F7E0] text-[#5aa60e]",
  중급: "bg-[#FFF4CF] text-[#D9B36C]",
  고급: "bg-[#FFE4E8] text-[#F0163A]",
};

const CATEGORY_COLORS: Record<Exclude<Category, "전체">, string> = {
  기본용어: "bg-[#E7F0FF] text-[#2B5772]",
  타격용어: "bg-[#FFE9E2] text-[#F37C38]",
  수비용어: "bg-[#EEEAFB] text-[#162CF0]",
  투수용어: "bg-[#EAF7EC] text-[#5aa60e]",
  전술용어: "bg-[#F3E8FF] text-[#7A3E9D]",
  기록용어: "bg-[#EAF0FF] text-[#162CF0]",
};

const ENTRIES: DictionaryEntry[] = [
  {
    id: "strike",
    term: "스트라이크",
    category: "기본용어",
    difficulty: "초급",
    meaning: "타자가 공을 치지 못하거나 스트라이크 존을 통과한 공",
    example: "투수가 던진 공이 홈플레이트 위를 지나가면 스트라이크입니다.",
  },
  {
    id: "ball",
    term: "볼",
    category: "기본용어",
    difficulty: "초급",
    meaning: "스트라이크 존을 벗어난 공으로 타자가 치지 않은 공",
    example: "4개의 볼이 선언되면 타자는 1루로 진루할 수 있습니다.",
  },
  {
    id: "homerun",
    term: "홈런",
    category: "타격용어",
    difficulty: "초급",
    meaning: "타자가 친 공이 외야 담장을 넘어가는 안타",
    example: "홈런이 선언되면 타자는 1루로 진출할 수 있습니다.",
  },
  {
    id: "doubleplay",
    term: "더블플레이 (병살)",
    category: "수비용어",
    difficulty: "중급",
    meaning: "한 번의 플레이로 두 명의 주자를 아웃시키는 수비",
    example:
      "2루수와 1루수의 호흡으로 1루와 2루에서 연달아 아웃을 만들었습니다.",
  },
  {
    id: "save",
    term: "세이브",
    category: "투수용어",
    difficulty: "중급",
    meaning: "승리 팀의 마무리 투수가 기록하는 세이브",
    example: "접전 끝에 마무리 투수가 등판해 세이브를 올립니다.",
  },
  {
    id: "balk",
    term: "보크",
    category: "투수용어",
    difficulty: "고급",
    meaning: "투수가 규정에 어긋나는 동작을 했을 때 선언되는 반칙",
    example: "보크가 선언되면 주자는 한 베이스씩 진루합니다.",
  },
  {
    id: "infieldfly",
    term: "인필드 플라이",
    category: "수비용어",
    difficulty: "고급",
    meaning:
      "주자 1,2루 또는 만루, 아웃 0 또는 1일 때 타자가 친 내야 플라이가 심판에 의해 자동 아웃되는 규칙",
    example:
      "1아웃에 주자가 1,2루일 때 내야 플라이가 떠서 인필드 플라이가 선언되었습니다.",
  },
  {
    id: "squeeze",
    term: "스퀴즈 플레이",
    category: "전술용어",
    difficulty: "중급",
    meaning: "3루 주자를 홈으로 불러들이기 위한 번트 전술",
    example: "3루 주자를 홈으로 불러들이는 스퀴즈 작전입니다.",
  },
  {
    id: "era",
    term: "ERA",
    category: "기록용어",
    difficulty: "중급",
    meaning: "투수가 9이닝 동안 내준 평균 자책점",
    example: "ERA가 낮을수록 투수의 실점 억제 능력이 좋다고 볼 수 있습니다.",
  },
];

const CATEGORY_FILTERS: Category[] = [
  "전체",
  "기본용어",
  "타격용어",
  "수비용어",
  "투수용어",
  "전술용어",
  "기록용어",
];

const DIFFICULTY_FILTERS: Difficulty[] = ["전체", "초급", "중급", "고급"];

export default function Dictionary() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<Category>("전체");
  const [difficulty, setDifficulty] = useState<Difficulty>("전체");

  const filteredEntries = useMemo(() => {
    return ENTRIES.filter((entry) => {
      const byCategory =
        category === "전체" ? true : entry.category === category;
      const byDifficulty =
        difficulty === "전체" ? true : entry.difficulty === difficulty;
      const bySearch = search.trim()
        ? [entry.term, entry.meaning, entry.example]
            .join(" ")
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        : true;
      return byCategory && byDifficulty && bySearch;
    });
  }, [search, category, difficulty]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#2B5772] rounded-full flex items-center justify-center mx-auto mb-8">
            <FaBookOpen size={32} className="text-white" />
          </div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B5772] mb-12 sm:mb-16 font-pretendard">
            야구 사전
          </div>
          <div className="text-base sm:text-lg text-[#2B5772]/70 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-2">
              야구의 기본 용어부터 전문 용어까지 쉽게 배우고 이해해보세요.
            </p>
            <p>각 용어마다 예시와 난이도가 표시되어 있습니다.</p>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border-[1.5px] border-[#F2CAB3] mb-8">
          <div className="relative mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="용어나 뜻을 검색하세요."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-base focus:border-[#2B5772] focus:outline-none focus:ring-2 focus:ring-[#2B5772]/20 transition-all"
              aria-label="사전 검색"
            />
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm6-1 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                카테고리
              </span>
              {CATEGORY_FILTERS.map((c) => {
                const isActive = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#2B5772] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-600">난이도</span>
              {DIFFICULTY_FILTERS.map((d) => {
                const isActive = difficulty === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#F37C38] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500 font-medium">
            총 {filteredEntries.length}개의 용어가 검색되었습니다.
          </div>
        </div>

        {/* Dictionary Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <article
              key={entry.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border-[1.5px] border-[#F2CAB3] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-pretendard">
                  {entry.term}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    DIFFICULTY_COLORS[entry.difficulty]
                  }`}
                >
                  {entry.difficulty}
                </span>
              </div>

              <div className="mb-5">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    CATEGORY_COLORS[entry.category]
                  }`}
                >
                  {entry.category}
                </span>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <div>
                  <div className="font-semibold text-gray-800 mb-2 font-pretendard">
                    뜻
                  </div>
                  <p className="text-gray-700 font-pretendard">
                    {entry.meaning}
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-2 font-pretendard">
                    예시
                  </div>
                  <p className="text-gray-700 font-pretendard italic">
                    "{entry.example}"
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom spacing for footer */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
    </div>
  );
}
