"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
    value: number[];
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number[]) => void;
    className?: string;
    label?: string;
}

// A simple custom slider since we aren't using Radix UI for this MVP to keep it lightweight with just Tailwind
// For a robust slider, Radix is recommended, but here is a simple HTML input range wrapper styled.
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, min = 0, max = 100, step = 1, onValueChange, label, ...props }, ref) => {

        // We only support single thumb for MVP simplicity via input range
        const currentValue = value[0] ?? min;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onValueChange?.([parseFloat(e.target.value)]);
        };

        // Calculate percentage for background fill
        const percentage = ((currentValue - min) / (max - min)) * 100;

        return (
            <div className={cn("w-full space-y-2", className)}>
                {label && (
                    <div className="flex justify-between items-center text-sm font-medium text-text-secondary">
                        <span>{label}</span>
                        <span className="text-primary">{currentValue}</span>
                    </div>
                )}
                <div className="relative w-full h-6 flex items-center">
                    {/* Track Background */}
                    <div className="absolute w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        {/* Fill */}
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    {/* Native Range Input (invisible but clickable) */}
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={currentValue}
                        onChange={handleChange}
                        ref={ref}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                        {...props}
                    />

                    {/* Custom Thumb (Pseudo-element visual) */}
                    <div
                        className="absolute h-5 w-5 bg-white border-2 border-primary rounded-full shadow-md pointer-events-none transition-all z-0"
                        style={{ left: `calc(${percentage}% - 10px)` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-400 px-1">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        );
    }
);
Slider.displayName = "Slider";

export { Slider };
