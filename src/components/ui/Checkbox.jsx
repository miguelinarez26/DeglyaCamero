import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

// Simplified Checkbox using standard input but styled to look custom if needed.
// However, accurate reimplementation of Radix Checkbox without Radix is complex.
// For now, I will use a standard input type="checkbox" with Tailwind form plugin styles if available, or custom styles.
// Since the user code uses <Checkbox id="..." />, I'll wrap a standard input.

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
    <input
        type="checkbox"
        ref={ref}
        className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-stone-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-structure focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-structure data-[state=checked]:text-white accent-structure",
            className
        )}
        {...props}
    />
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
