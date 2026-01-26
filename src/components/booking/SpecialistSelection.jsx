import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SpecialistSelection = ({ onSelect, selected, specialists = [] }) => {
    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialists.map((specialist) => (
                <div
                    key={specialist.id}
                    onClick={() => onSelect(specialist.id)}
                    className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2",
                        selected === specialist.id ? "border-deglya-teal ring-2 ring-deglya-teal/30" : "border-transparent"
                    )}
                >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={specialist.image} alt={specialist.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-2xl font-display font-bold">{specialist.name}</h3>
                            <p className="text-deglya-mustard font-medium text-sm uppercase tracking-wider">{specialist.role}</p>
                            <p className="mt-2 text-white/80 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                Especialidad: {specialist.specialty}
                            </p>
                        </div>
                        {selected === specialist.id && (
                            <div className="absolute top-4 right-4 bg-deglya-teal text-white p-2 rounded-full shadow-lg animate-in zoom-in">
                                <CheckCircle2 size={24} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
