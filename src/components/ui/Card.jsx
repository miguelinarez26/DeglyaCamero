import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "rounded-xl border border-white/20 bg-deglya-cream/80 text-deglya-teal shadow-lg backdrop-blur-sm",
                "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }) {
    return <div className={cn("p-6 pt-0", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }) {
    return <div className={cn("flex items-center p-6 pt-0", className)} {...props}>{children}</div>;
}
