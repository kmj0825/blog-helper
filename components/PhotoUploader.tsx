"use client";

import * as React from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

interface PhotoUploaderProps {
    photos: File[];
    onPhotosChange: (photos: File[]) => void;
    maxPhotos?: number;
}

export function PhotoUploader({ photos, onPhotosChange, maxPhotos = 10 }: PhotoUploaderProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const combinedPhotos = [...photos, ...newFiles].slice(0, maxPhotos);
            onPhotosChange(combinedPhotos);
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        onPhotosChange(newPhotos);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                    사진 업로드
                    <span className="ml-2 text-sm font-normal text-text-secondary">
                        ({photos.length}/{maxPhotos})
                    </span>
                </h3>
            </div>

            {photos.length === 0 ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-text-secondary hover:border-primary hover:bg-surface cursor-pointer transition-colors h-48"
                >
                    <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                        <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium">사진을 선택해주세요</p>
                    <p className="text-xs mt-1 text-gray-400">최대 {maxPhotos}장까지 가능해요</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {photos.map((photo, index) => (
                        <div key={`${photo.name}-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-gray-100">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            {index === 0 && (
                                <span className="absolute bottom-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-sm">대표</span>
                            )}
                        </div>
                    ))}
                    {photos.length < maxPhotos && (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-text-secondary hover:border-primary hover:text-primary transition-colors bg-surface"
                        >
                            <Upload className="h-5 w-5 mb-1" />
                            <span className="text-xs">추가</span>
                        </button>
                    )}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/*"
            />
        </div>
    );
}
