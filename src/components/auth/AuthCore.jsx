import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// --------------------------------
// Enums
// --------------------------------

export const AuthView = {
    SIGN_IN: "sign-in",
    SIGN_UP: "sign-up",
    FORGOT_PASSWORD: "forgot-password",
    RESET_SUCCESS: "reset-success",
};

// --------------------------------
// Schemas
// --------------------------------

const signInSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const signUpSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    terms: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos" }) }),
});

const forgotPasswordSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
});

// --------------------------------
// Core Component
// --------------------------------

export default function AuthCore({ initialView = AuthView.SIGN_IN, className, onBack, onSuccess }) {
    const [state, setState] = useState({ view: initialView });

    const setView = useCallback((view) => {
        setState((prev) => ({ ...prev, view }));
    }, []);

    return (
        <div className={cn("relative w-full", className)}>
            <AnimatePresence mode="wait">
                {state.view === AuthView.SIGN_IN && (
                    <AuthSignIn
                        key="sign-in"
                        onForgotPassword={() => setView(AuthView.FORGOT_PASSWORD)}
                        onSignUp={() => setView(AuthView.SIGN_UP)}
                        onSuccess={onSuccess}
                        onBack={onBack}
                    />
                )}
                {state.view === AuthView.FORGOT_PASSWORD && (
                    <AuthForgotPassword
                        key="forgot-password"
                        onSignIn={() => setView(AuthView.SIGN_IN)}
                        onSuccess={() => setView(AuthView.RESET_SUCCESS)}
                    />
                )}
                {state.view === AuthView.RESET_SUCCESS && (
                    <AuthResetSuccess
                        key="reset-success"
                        onSignIn={() => setView(AuthView.SIGN_IN)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// --------------------------------
// Shared Components
// --------------------------------

function AuthForm({ onSubmit, children, className }) {
    return (
        <form
            onSubmit={onSubmit}
            className={cn("space-y-6", className)}
        >
            {children}
        </form>
    );
}

function AuthError({ message }) {
    if (!message) return null;
    return (
        <div
            className="mb-6 animate-in rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500"
        >
            {message}
        </div>
    );
}



// --------------------------------
// Sign In Component
// --------------------------------

function AuthSignIn({ onForgotPassword, onSignUp, onSuccess, onBack }) {
    const [formState, setFormState] = useState({
        isLoading: false,
        error: null,
        showPassword: false,
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data) => {
        setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                if (error.message === "Invalid login credentials") {
                    throw new Error("Correo o contraseña incorrectos.");
                }
                throw error;
            }

            if (onSuccess) onSuccess();
            // Don't stop loading here if successful, wait for redirect/unmount
        } catch (error) {
            console.error("Login Error:", error);
            setFormState((prev) => ({
                ...prev,
                error: error.message || "Ocurrió un error al iniciar sesión.",
                isLoading: false // Stop loading on error
            }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-8 pt-6"
        >
            {onBack && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-4 hover:bg-stone-100 text-stone-400 hover:text-stone-600"
                    onClick={onBack}
                    disabled={formState.isLoading}
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Volver</span>
                </Button>
            )}

            <div className="mb-6 text-center">
                <h1 className="text-3xl font-display font-semibold text-stone-800">Bienvenido</h1>
                <p className="mt-2 text-sm text-stone-500">Inicia sesión en tu cuenta</p>
            </div>

            <AuthError message={formState.error} />

            <AuthForm onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        disabled={formState.isLoading}
                        className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <Button
                            type="button"
                            variant="link"
                            className="h-auto p-0 text-xs text-structure"
                            onClick={onForgotPassword}
                            disabled={formState.isLoading}
                        >
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={formState.showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            disabled={formState.isLoading}
                            className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
                            {...register("password")}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full hover:bg-transparent text-stone-400 hover:text-stone-600"
                            onClick={() =>
                                setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
                            }
                            disabled={formState.isLoading}
                        >
                            {formState.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </div>

                <Button type="submit" className="w-full bg-structure hover:bg-structure/90 text-white" disabled={formState.isLoading}>
                    {formState.isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Iniciando sesión...
                        </>
                    ) : (
                        "Iniciar Sesión"
                    )}
                </Button>
            </AuthForm>

        </motion.div>
    );
}



// --------------------------------
// Forgot Password Component
// --------------------------------

function AuthForgotPassword({ onSignIn, onSuccess }) {
    const [formState, setFormState] = useState({
        isLoading: false,
        error: null,
        showPassword: false,
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data) => {
        setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
                redirectTo: window.location.origin + '/reset-password',
            });
            if (error) throw error;
            onSuccess();
        } catch (error) {
            console.error("Forgot Password Error:", error);
            setFormState((prev) => ({
                ...prev,
                error: error.message || "Ocurrió un error al enviar el correo.",
                isLoading: false
            }));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-8 pt-6"
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-4 hover:bg-transparent"
                onClick={onSignIn}
                disabled={formState.isLoading}
            >
                <ArrowLeft className="h-5 w-5 text-stone-500 hover:text-stone-800" />
                <span className="sr-only">Volver</span>
            </Button>

            <div className="mb-6 text-center mt-6">
                <h1 className="text-3xl font-display font-semibold text-stone-800">Recuperar contraseña</h1>
                <p className="mt-2 text-sm text-stone-500">
                    Ingresa tu email para recibir un enlace de recuperación
                </p>
            </div>

            <AuthError message={formState.error} />

            <AuthForm onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        disabled={formState.isLoading}
                        className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                        {...register("email")}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <Button type="submit" className="w-full bg-structure hover:bg-structure/90 text-white" disabled={formState.isLoading}>
                    {formState.isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        "Enviar enlace"
                    )}
                </Button>
            </AuthForm>

            <p className="mt-8 text-center text-sm text-stone-500">
                ¿Recordaste tu contraseña?{" "}
                <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-structure font-semibold"
                    onClick={onSignIn}
                    disabled={formState.isLoading}
                >
                    Iniciar sesión
                </Button>
            </p>
        </motion.div>
    );
}

// --------------------------------
// Reset Success Component
// --------------------------------

function AuthResetSuccess({ onSignIn }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center p-8 text-center pt-6"
        >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-structure/10">
                <MailCheck className="h-8 w-8 text-structure" />
            </div>

            <h1 className="text-2xl font-display font-semibold text-stone-800">Revisa tu correo</h1>
            <p className="mt-2 text-sm text-stone-500">
                Hemos enviado un enlace de recuperación a tu correo electrónico.
            </p>

            <Button
                variant="outline"
                className="mt-6 w-full max-w-xs border-structure text-structure hover:bg-structure/10"
                onClick={onSignIn}
            >
                Volver a Iniciar sesión
            </Button>

            <p className="mt-6 text-xs text-stone-500">
                ¿No llegó? Revisa spam o{" "}
                <Button variant="link" className="h-auto p-0 text-xs text-structure">
                    prueba con otro correo
                </Button>
            </p>
        </motion.div>
    );
}
