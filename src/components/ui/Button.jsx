import React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging (simplified version if utils not available)
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
    {
        variants: {
            variant: {
                default: "btn-action-blue shadow-sm", // Changed to btn-action-blue
                action: "btn-action-blue shadow-sm uppercase tracking-wide font-bold", // Added btn-action-blue
                outline: "border-2 border-structure text-structure hover:bg-structure/10",
                ghost: "hover:bg-accent/10 text-accent",
                link: "text-structure underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-3 rounded-full",
                lg: "h-12 px-8 rounded-full text-base",
                icon: "h-10 w-10 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"; // Simplified Slot behavior for now
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
