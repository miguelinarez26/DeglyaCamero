import React from "react";
import AuthCore from "@/components/auth/AuthCore";
import { cn } from "@/lib/utils";

function Login({ className, ...props }) {
    return (
        <div
            className={cn("min-h-screen flex items-center justify-center p-4 bg-gray-50", className)}
            {...props}
        >
            <div className="w-full max-w-md relative overflow-hidden rounded-xl border border-stone-200 bg-white/80 shadow-xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-structure/5 to-conversion/5" />
                <div className="relative z-10">
                    <AuthCore />
                </div>
            </div>
        </div>
    );
}

export default Login;
