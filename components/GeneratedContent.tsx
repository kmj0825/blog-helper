"use client";

import * as React from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "./ui/Button";

interface GeneratedContentProps {
    content: string;
    onRegenerate?: () => void;
}

export function GeneratedContent({ content, onRegenerate }: GeneratedContentProps) {
    const [copied, setCopied] = React.useState(false);

    // Parse markdown-ish content to simple HTML paragraphs for preview
    // In a real app we might use 'react-markdown', but here we'll just split by newlines for simplicity
    const paragraphs = content.split('\n\n').filter(Boolean);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">✨ 생성된 블로그 글</h3>
                <div className="flex gap-2">
                    {onRegenerate && (
                        <Button variant="outline" size="sm" onClick={onRegenerate}>
                            <RefreshCw className="h-4 w-4 mr-1" />
                            다시 생성
                        </Button>
                    )}
                    <Button
                        variant={copied ? "secondary" : "primary"}
                        size="sm"
                        onClick={handleCopy}
                        className={copied ? "text-green-600 bg-green-50" : ""}
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4 mr-1" />
                                복사 완료!
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4 mr-1" />
                                전체 복사
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-border rounded-xl p-6 shadow-sm min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar">
                {paragraphs.length > 0 ? (
                    <div className="space-y-4 text-text-primary leading-relaxed">
                        {paragraphs.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50">
                        <p>아직 생성된 글이 없습니다.</p>
                    </div>
                )}
            </div>

            <p className="text-center text-xs text-text-secondary bg-surface p-2 rounded-lg">
                💡 팁: 복사 버튼을 누른 후 네이버 블로그 앱에서 '붙여넣기' 하세요. 사진은 별도로 첨부해야 합니다.
            </p>
        </div>
    );
}
