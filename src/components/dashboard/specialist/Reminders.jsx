import React from 'react';

const Reminders = () => {
    return (
        <div className="bg-deglya-soft-gold/20 rounded-2xl p-6 border border-deglya-soft-gold/50 flex flex-col gap-4">
            <h3 className="font-display text-lg text-deglya-accent italic">Recordatorios</h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                    <input className="mt-1 rounded border-gray-300 text-deglya-primary focus:ring-deglya-primary bg-transparent cursor-pointer" type="checkbox" checked readOnly />
                    <span className="text-sm text-gray-500 line-through decoration-gray-400 transition-colors group-hover:text-gray-700">Enviar factura a Sofia G.</span>
                </li>
                <li className="flex items-start gap-3 group">
                    <input className="mt-1 rounded border-gray-300 text-deglya-primary focus:ring-deglya-primary bg-transparent cursor-pointer" type="checkbox" />
                    <span className="text-sm text-gray-700 font-medium transition-colors group-hover:text-deglya-primary">Preparar material "El Reino"</span>
                </li>
                <li className="flex items-start gap-3 group">
                    <input className="mt-1 rounded border-gray-300 text-deglya-primary focus:ring-deglya-primary bg-transparent cursor-pointer" type="checkbox" />
                    <span className="text-sm text-gray-700 font-medium transition-colors group-hover:text-deglya-primary">Actualizar agenda web</span>
                </li>
            </ul>
        </div>
    );
};

export default Reminders;
