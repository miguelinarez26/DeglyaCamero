import { Navigate, Outlet } from 'react-router-dom';
import { useUserRole } from '../../hooks/useUserRole';
import { Database } from '../../types/supabase';

type UserRole = Database['public']['Enums']['user_role'];

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user, role, loading } = useUserRole();

    if (loading) {
        // 2026 Style Loading State (Glassmorphism + Pulse)
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-deglya-charcoal text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-deglya-teal border-t-transparent rounded-full animate-spin" />
                    <p className="font-display text-lg animate-pulse">Verificando Credenciales...</p>
                </div>
            </div>
        );
    }

    // 1. Not Authenticated -> Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Authenticated but no role loaded yet (should cover in loading, but safe guard)
    if (!role) {
        return <Navigate to="/login" replace />;
    }

    // 3. VIP ACCESS: 'programador' bypasses all checks
    if (role === 'programador') {
        return <Outlet />;
    }

    // 4. Role Check
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 5. Access Granted
    return <Outlet />;
};

export default ProtectedRoute;
