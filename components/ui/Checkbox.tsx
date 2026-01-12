"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, checked, onCheckedChange, disabled, ...props }, ref) => {
        return (
            <label className={cn(
                "inline-flex items-center space-x-2 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}>
                <div className="relative">
                    <input
                        type="checkbox"
                        className="peer sr-only"
                        ref={ref}
                        checked={checked}
                        onChange={(e) => onCheckedChange(e.target.checked)}
                        disabled={disabled}
                        {...props}
                    />
                    <div className={cn(
                        "h-5 w-5 rounded border border-border bg-white transition-all peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-offset-2",
                        checked ? "bg-primary border-primary text-white" : "hover:border-primary"
                    )}>
                        {checked && (
                            <Check className="h-4 w-4 absolute top-0.5 left-0.5 pointer-events-none" strokeWidth={3} />
                        )}
                    </div>
                </div>
                {label && <span className="text-sm text-text-primary">{label}</span>}
            </label>
        );
    }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
