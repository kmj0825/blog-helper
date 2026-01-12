"use client";

import * as React from "react";
import { PhotoUploader } from "@/components/PhotoUploader";
import { ExperienceSelector, ExperienceData } from "@/components/ExperienceSelector";
import { GeneratedContent } from "@/components/GeneratedContent";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [photos, setPhotos] = React.useState<File[]>([]);
  const [experienceData, setExperienceData] = React.useState<ExperienceData>({
    firstImpression: [],
    tasteRating: 0,
    valueRating: 50,
    pros: [],
    cons: [],
    oneLiner: "",
  });
  const [generatedContent, setGeneratedContent] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerate = async () => {
    if (!experienceData.tasteRating || experienceData.firstImpression.length === 0) {
      alert("첫인상과 맛 평가는 필수입니다!");
      return;
    }

    setIsLoading(true);
    setGeneratedContent(""); // Reset previous content

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experience: experienceData,
          photoCount: photos.length,
          placeName: "판교 맛집 (임시)", // In future, extract from EXIF
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      // Handle streaming response if we implement it, or simple JSON for now
      // For MVP v0.1 simplified to JSON response
      const data = await response.json();
      setGeneratedContent(data.content);

    } catch (error) {
      console.error(error);
      alert("글 생성에 실패했습니다. API 키를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="bg-primary text-white p-1 rounded-md">B</span>
            Blog Helper
          </h1>
          <span className="text-xs font-medium text-primary bg-accent-light px-2 py-1 rounded-full">Beta</span>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8 space-y-8">

        {/* Intro */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-primary">오늘의 경험을 기록해볼까요?</h2>
          <p className="text-text-secondary">사진을 올리고 키워드만 선택하면,<br />블로그 글이 뚝딱 완성됩니다.</p>
        </div>

        {/* Step 1: Photos */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">1</span>
            <h3 className="text-lg font-semibold text-text-primary">사진 선택</h3>
          </div>
          <PhotoUploader photos={photos} onPhotosChange={setPhotos} />
        </section>

        {/* Step 2: Experience */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">2</span>
            <h3 className="text-lg font-semibold text-text-primary">경험 입력</h3>
          </div>
          <ExperienceSelector data={experienceData} onChange={setExperienceData} />
        </section>

        {/* Action Button */}
        <div className="pt-4 sticky bottom-6 z-40">
          <Button
            size="lg"
            className="w-full shadow-lg text-lg h-14"
            onClick={handleGenerate}
            isLoading={isLoading}
            disabled={photos.length === 0 && false} // Allow testing without photos for now
          >
            {!isLoading && <Sparkles className="mr-2 h-5 w-5" />}
            {isLoading ? "AI가 글을 쓰고 있어요..." : "블로그 글 생성하기"}
          </Button>
        </div>

        {/* Step 3: Result */}
        {generatedContent && (
          <section className="space-y-4 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">3</span>
              <h3 className="text-lg font-semibold text-text-primary">완성된 글</h3>
            </div>
            <GeneratedContent content={generatedContent} onRegenerate={handleGenerate} />
          </section>
        )}

      </div>
    </main>
  );
}
