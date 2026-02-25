import React from 'react';
import { cn } from '../../../lib/utils';

const StatCard = ({ label, value, icon, colorVariant = 'gold' }) => {
    const variants = {
        gold: "bg-deglya-soft-gold/40 text-deglya-primary",
        green: "bg-green-100 text-green-600",
        blue: "bg-blue-100 text-blue-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center gap-4 transition-all hover:translate-y-[-2px]">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", variants[colorVariant] || variants.gold)}>
                <span className="material-icons-outlined">{icon}</span>
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium whitespace-nowrap">{label}</p>
                <p className="text-2xl font-display font-bold text-deglya-accent leading-none mt-1">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
