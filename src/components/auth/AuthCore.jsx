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
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const signUpSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
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
                {state.view === AuthView.SIGN_UP && (
                    <AuthSignUp
                        key="sign-up"
                        onSignIn={() => setView(AuthView.SIGN_IN)}
                        onSuccess={onSuccess}
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

function AuthSocialButtons({ isLoading }) {
    const handleGoogleLogin = async () => {
        // Implement Google Login logic here
        // For now, it's a placeholder as we focus on Email/Password first
        console.log("Google Login Clicked");
    };

    return (
        <div className="w-full mt-6">
            <Button
                variant="outline"
                className="w-full h-12 bg-white/50 border-stone-200"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                type="button"
            >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
            </Button>
        </div>
    );
}

function AuthSeparator({ text = "O continúa con" }) {
    return (
        <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
                <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-stone-500">{text}</span>
            </div>
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

            <AuthSeparator />
            <AuthSocialButtons isLoading={formState.isLoading} />

            <p className="mt-8 text-center text-sm text-stone-500">
                ¿No tienes cuenta?{" "}
                <Button
                    variant="link"
                    className="h-auto p-0 text-sm text-structure font-semibold"
                    onClick={onSignUp}
                    disabled={formState.isLoading}
                >
                    Crear una
                </Button>
            </p>
        </motion.div>
    );
}

// --------------------------------
// Sign Up Component
// --------------------------------

function AuthSignUp({ onSignIn, onSuccess }) {
    const [formState, setFormState] = useState({
        isLoading: false,
        error: null,
        showPassword: false,
    });

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: "", email: "", password: "", terms: false },
    });

    const terms = watch("terms");

    const onSubmit = async (data) => {
        setFormState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const { error: signUpError, data: authData } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.name,
                        role: 'patient', // Default role
                    },
                },
            });

            if (signUpError) throw signUpError;

            // Optionally create profile manually if trigger doesn't exist
            // But usually we rely on postgres trigger on auth.users -> public.profiles

            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Signup Error:", error);
            setFormState((prev) => ({
                ...prev,
                error: error.message || "Ocurrió un error al crear la cuenta.",
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
                className="absolute left-4 top-4 hover:bg-stone-100 text-stone-400 hover:text-stone-600"
                onClick={onSignIn}
                disabled={formState.isLoading}
            >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Volver</span>
            </Button>

            <div className="mb-6 text-center">
                <h1 className="text-3xl font-display font-semibold text-stone-800">Crear cuenta</h1>
                <p className="mt-2 text-sm text-stone-500">Comienza tu viaje con nosotros</p>
            </div>

            <AuthError message={formState.error} />

            <AuthForm onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Juan Pérez"
                        disabled={formState.isLoading}
                        className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
                        {...register("name")}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

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
                    <Label htmlFor="password">Contraseña</Label>
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

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        checked={terms}
                        onChange={(e) => setValue("terms", e.target.checked, { shouldValidate: true })}
                        disabled={formState.isLoading}
                        className="rounded border-stone-300 text-structure focus:ring-structure"
                    />
                    <div className="space-y-1">
                        <Label htmlFor="terms" className="text-sm cursor-pointer">
                            Acepto los términos
                        </Label>
                        <p className="text-xs text-stone-500">
                            Al registrarte, aceptas nuestros{" "}
                            <Button variant="link" className="h-auto p-0 text-xs text-structure">
                                Términos
                            </Button>{" "}
                            y{" "}
                            <Button variant="link" className="h-auto p-0 text-xs text-structure">
                                Política de Privacidad
                            </Button>
                            .
                        </p>
                    </div>
                </div>
                {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

                <Button type="submit" className="w-full bg-structure hover:bg-structure/90 text-white" disabled={formState.isLoading}>
                    {formState.isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creando cuenta...
                        </>
                    ) : (
                        "Crear cuenta"
                    )}
                </Button>
            </AuthForm>

            <AuthSeparator />
            <AuthSocialButtons isLoading={formState.isLoading} />

            <p className="mt-8 text-center text-sm text-stone-500">
                ¿Ya tienes cuenta?{" "}
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
