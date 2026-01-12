"use client";

import * as React from "react";
import { Button } from "./ui/Button";
import { Slider } from "./ui/Slider";
import { Checkbox } from "./ui/Checkbox";

export interface ExperienceData {
    firstImpression: string[];
    tasteRating: number;
    valueRating: number;
    pros: string[];
    cons: string[];
    oneLiner: string;
}

interface ExperienceSelectorProps {
    data: ExperienceData;
    onChange: (data: ExperienceData) => void;
}

// Pre-defined options as per PRD
const OPTIONS = {
    firstImpression: ["깔끔함", "아늑함", "트렌디", "복잡함", "이국적", "친근함"],
    pros: ["친절한 서비스", "빠른 서빙", "주차 편리", "넓은 좌석", "분위기", "위치 접근성"],
    cons: ["웨이팅 김", "좁은 공간", "시끄러움", "가격 비쌈", "양 적음", "주차 어려움"],
    oneLiners: ["또 오고 싶어요", "데이트 추천", "가족 식사 굿", "혼밥 가능", "회식 장소 강추"]
};

export function ExperienceSelector({ data, onChange }: ExperienceSelectorProps) {

    // Helpers to update state
    const toggleSelection = (key: keyof ExperienceData, value: string) => {
        const currentList = data[key] as string[];
        const newList = currentList.includes(value)
            ? currentList.filter(item => item !== value)
            : [...currentList, value];

        onChange({ ...data, [key]: newList });
    };

    const handleSliderChange = (val: number[]) => {
        onChange({ ...data, valueRating: val[0] });
    };

    return (
        <div className="space-y-8 bg-white p-6 rounded-2xl border border-border shadow-sm">

            {/* 1. First Impression (Button Select) */}
            <section>
                <h4 className="text-sm font-semibold text-text-primary mb-3">🍽️ 첫인상 (복수 선택)</h4>
                <div className="flex flex-wrap gap-2">
                    {OPTIONS.firstImpression.map(opt => (
                        <button
                            key={opt}
                            onClick={() => toggleSelection('firstImpression', opt)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all border ${data.firstImpression.includes(opt)
                                    ? "bg-accent-light border-primary text-primary font-bold shadow-sm"
                                    : "bg-white border-gray-200 text-text-secondary hover:bg-gray-50"
                                }`}
                        >
                            {data.firstImpression.includes(opt) && "✓ "}
                            {opt}
                        </button>
                    ))}
                </div>
            </section>

            {/* 2. Taste Rating (Stars/Points visualization) */}
            <section>
                <h4 className="text-sm font-semibold text-text-primary mb-3">⭐ 맛 평가</h4>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                        <button
                            key={score}
                            onClick={() => onChange({ ...data, tasteRating: score })}
                            className={`flex-1 h-12 rounded-lg flex flex-col items-center justify-center transition-all border ${data.tasteRating === score
                                    ? "bg-primary text-white border-primary shadow-md transform scale-105"
                                    : "bg-surface border-border text-gray-400 hover:bg-gray-100"
                                }`}
                        >
                            <span className="text-lg">{score >= 5 ? '😍' : score >= 4 ? '😋' : score >= 3 ? '🙂' : score >= 2 ? '🤔' : '😫'}</span>
                            <span className="text-xs mt-1">{score}점</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* 3. Value Rating (Slider) */}
            <section>
                <h4 className="text-sm font-semibold text-text-primary mb-4">💰 가성비</h4>
                <div className="px-2">
                    <Slider
                        value={[data.valueRating]}
                        min={0}
                        max={100}
                        step={10}
                        onValueChange={handleSliderChange}
                        className="my-4"
                    />
                    <div className="flex justify-between text-xs text-text-secondary mt-2">
                        <span>비쌈</span>
                        <span>적당함</span>
                        <span>가성비 굿</span>
                    </div>
                </div>
            </section>

            <div className="h-px bg-border my-6" />

            {/* 4. Pros & Cons (Checkbox/Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                    <h4 className="text-sm font-semibold text-text-primary mb-3 text-green-600">👍 좋았던 점</h4>
                    <div className="space-y-2">
                        {OPTIONS.pros.map(opt => (
                            <Checkbox
                                key={opt}
                                label={opt}
                                checked={data.pros.includes(opt)}
                                onCheckedChange={() => toggleSelection('pros', opt)}
                                className="w-full p-2 hover:bg-surface rounded-lg -ml-2"
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h4 className="text-sm font-semibold text-text-primary mb-3 text-red-500">👎 아쉬운 점</h4>
                    <div className="space-y-2">
                        {OPTIONS.cons.map(opt => (
                            <Checkbox
                                key={opt}
                                label={opt}
                                checked={data.cons.includes(opt)}
                                onCheckedChange={() => toggleSelection('cons', opt)}
                                className="w-full p-2 hover:bg-surface rounded-lg -ml-2"
                            />
                        ))}
                    </div>
                </section>
            </div>

            <div className="h-px bg-border my-6" />

            {/* 5. One Liner (Chips + Custom) */}
            <section>
                <h4 className="text-sm font-semibold text-text-primary mb-3">💬 한줄평 (선택 또는 입력)</h4>
                <div className="grid grid-cols-2 gap-2 mb-3">
                    {OPTIONS.oneLiners.map(opt => (
                        <button
                            key={opt}
                            onClick={() => onChange({ ...data, oneLiner: opt })}
                            className={`py-2 px-3 rounded-lg text-sm text-left border ${data.oneLiner === opt
                                    ? "bg-primary/10 border-primary text-primary font-medium"
                                    : "bg-surface border-border text-text-secondary hover:bg-gray-100"
                                }`}
                        >
                            "{opt}"
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="직접 입력하기..."
                    className="w-full p-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-all"
                    value={data.oneLiner}
                    onChange={(e) => onChange({ ...data, oneLiner: e.target.value })}
                />
            </section>

        </div>
    );
}
