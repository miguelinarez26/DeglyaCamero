import React, { useEffect, useState } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import StatCard from '@/components/dashboard/specialist/StatCard';
import WeeklyCalendar from '@/components/dashboard/specialist/WeeklyCalendar';
import RecentConsultations from '@/components/dashboard/specialist/RecentConsultations';
import NextSessionCard from '@/components/dashboard/specialist/NextSessionCard';
import RecentPatients from '@/components/dashboard/specialist/RecentPatients';
import Reminders from '@/components/dashboard/specialist/Reminders';

export default function SpecialistDashboard() {
    const { profile, loading: authLoading } = useUserRole();
    const [loading, setLoading] = useState(false);

    if (authLoading || loading) {
        return (
            <div className="h-full w-full flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deglya-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left + Center) */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard
                            label="Citas Hoy"
                            value="4"
                            icon="calendar_today"
                            colorVariant="gold"
                        />
                        <StatCard
                            label="Pacientes Activos"
                            value="28"
                            icon="groups"
                            colorVariant="green"
                        />
                        <StatCard
                            label="Nuevos Contactos"
                            value="12"
                            icon="mail"
                            colorVariant="blue"
                        />
                    </div>

                    {/* Weekly Calendar Section */}
                    <WeeklyCalendar />

                    {/* Recent Consultations */}
                    <RecentConsultations />
                </div>

                {/* Sidebar Content (Right) */}
                <div className="flex flex-col gap-8">
                    <NextSessionCard
                        name="Patricia Leal"
                        type="Consultoría Corporativa"
                        time="15 min"
                        avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCyFTR0K6LfnQbVZ_Nd1jScOIi2mzPlMiEn_DOhVLy9yZ_E9ZbClGavI0uY1eg6tS9JVi4O7NjF4UNquLaV4Vbgn8puIfMQ2MXyv9s5VdbxtOG9NhbDq7v-ObMpdI4jM-kmDiL4L3zPFj0_ovU97cng6LxA5uGyTCSI-RpakUo4GFDipdaSIJZerusuY_zeBw2DQqIoNfMS68c8x5c3oaxJYsztcyYHXL8c32kskTIlwxaAhAYtSqMx9MUpCatpq_FZNcW8F0dncgA"
                        onAction={() => alert('Ver ficha de Patricia')}
                    />

                    <RecentPatients />

                    <Reminders />
                </div>
            </div>
        </div>
    );
}
