import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthCore from "@/components/auth/AuthCore";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/hooks/useUserRole";

function Login({ className, ...props }) {
    const navigate = useNavigate();
    const { user, role, loading } = useUserRole();

    useEffect(() => {
        if (user && !loading) {
            // Redirect based on role
            // If role is null but user exists, it might be a new user or error.
            // But let's assume valid role for now or default to patient if unsure?
            // Better to wait for role.
            if (role === 'patient') {
                navigate('/dashboard/paciente');
            } else if (role === 'specialist') {
                navigate('/dashboard/especialista');
            } else if (['receptionist', 'admin'].includes(role)) {
                navigate('/dashboard/recepcion');
            } else if (role) {
                // Unknown role
                navigate('/dashboard/paciente');
            }
        }
    }, [user, role, loading, navigate]);

    return (
        <div
            className={cn("min-h-screen flex items-center justify-center p-4 bg-gray-50", className)}
            {...props}
        >
            <div className="w-full max-w-md relative overflow-hidden rounded-xl border border-stone-200 bg-white/80 shadow-xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-structure/5 to-conversion/5" />
                <div className="relative z-10">
                    <AuthCore
                        onSuccess={() => {
                            // The useEffect will handle the redirect when auth state updates
                            console.log("Login success, waiting for redirect...");
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
