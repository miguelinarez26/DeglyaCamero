import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StepIndicator = ({ currentStep, steps }) => (
    <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300",
                        index + 1 <= currentStep
                            ? "bg-deglya-teal border-deglya-teal text-white shadow-[0_0_15px_rgba(27,108,168,0.4)]"
                            : "border-deglya-wood/30 text-deglya-wood/50 bg-white"
                    )}>
                        {index + 1 < currentStep ? <CheckCircle2 size={20} /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "w-12 h-0.5 mx-2 transition-all duration-300",
                            index + 1 < currentStep ? "bg-deglya-teal" : "bg-deglya-wood/20"
                        )} />
                    )}
                </div>
            ))}
        </div>
    </div>
);
