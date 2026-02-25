import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/lib/uiStore';
import { X, DollarSign, FileText, ChevronDown, Check, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function TransactionPanel() {
    const { isTransactionPanelOpen, closeTransactionPanel, editingTransactionData } = useUIStore();

    // Form State
    const [type, setType] = useState('income'); // income, expense
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [concept, setConcept] = useState('');
    const [patientQuery, setPatientQuery] = useState('');
    const [status, setStatus] = useState('Pagado'); // Pagado, Pendiente, Verificando

    // Sync with existing data if editing
    useEffect(() => {
        if (editingTransactionData) {
            // Se asume que recibe un objeto como los del mock de transacciones
            setType(editingTransactionData.concept?.includes('Gasto') ? 'expense' : 'income');
            setAmount(editingTransactionData.amount?.replace('$', '') || '');
            setMethod(editingTransactionData.method || '');
            setConcept(editingTransactionData.concept || '');
            setPatientQuery(editingTransactionData.patient || '');
            setStatus(editingTransactionData.status || 'Pagado');
        } else {
            // Reset fields
            setType('income');
            setAmount('');
            setMethod('');
            setConcept('');
            setPatientQuery('');
            setStatus('Pagado');
        }
    }, [editingTransactionData, isTransactionPanelOpen]);

    if (!isTransactionPanelOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Movimiento Guardado:", { type, amount, method, concept, patientQuery, status });
        alert(editingTransactionData ? "Movimiento actualizado con éxito" : "Movimiento creado con éxito");
        closeTransactionPanel();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={closeTransactionPanel}
            />

            {/* Slide-over Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50">
                    <div>
                        <h2 className="font-display text-2xl text-teal-800">
                            {editingTransactionData ? 'Editar Movimiento' : 'Nuevo Movimiento'}
                        </h2>
                        <p className="text-sm text-stone-500 mt-1">
                            {editingTransactionData ? 'Modifica los detalles de esta transacción' : 'Registra un ingreso o gasto manual'}
                        </p>
                    </div>
                    <button
                        onClick={closeTransactionPanel}
                        className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Form */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="transaction-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Tipo de Movimiento */}
                        <div className="flex bg-stone-100 p-1 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={cn(
                                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                                    type === 'income' ? "bg-white text-emerald-700 shadow-sm" : "text-stone-500 hover:text-stone-700"
                                )}
                            >
                                Ingreso
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={cn(
                                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                                    type === 'expense' ? "bg-white text-red-700 shadow-sm" : "text-stone-500 hover:text-stone-700"
                                )}
                            >
                                Egreso
                            </button>
                        </div>

                        {/* Monto */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-teal-900">Monto (USD)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="w-5 h-5 text-stone-400" />
                                </div>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 text-2xl font-bold bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-800"
                                />
                            </div>
                        </div>

                        {/* Paciente Relacionado (Opcional) */}
                        {type === 'income' && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-teal-900 flex justify-between">
                                    <span>Paciente</span>
                                    <span className="text-stone-400 font-normal">Opcional</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o cédula..."
                                        value={patientQuery}
                                        onChange={(e) => setPatientQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-700"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Concepto */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-teal-900">Concepto o Detalles</label>
                            <input
                                type="text"
                                required
                                placeholder="Ej: Pago de Terapia Mensual, Alquiler..."
                                value={concept}
                                onChange={(e) => setConcept(e.target.value)}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-700"
                            />
                        </div>

                        {/* Método de Pago */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-teal-900">Método de Transferencia</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { id: 'Pago Móvil', label: 'Pago Móvil' },
                                    { id: 'Binance (USDT)', label: 'Binance (USDT)' },
                                    { id: 'Efectivo ($)', label: 'Efectivo ($)' },
                                    { id: 'Zelle', label: 'Zelle / Int.' },
                                    { id: 'Transferencia Nacional', label: 'Transf. Nacional' }
                                ].map(option => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setMethod(option.id)}
                                        className={cn(
                                            "px-3 py-2.5 text-sm font-medium rounded-xl border text-left transition-all flex items-center justify-between",
                                            method === option.id
                                                ? "bg-teal-50 border-teal-600 text-teal-800 shadow-sm"
                                                : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                                        )}
                                    >
                                        <span className="truncate">{option.label}</span>
                                        {method === option.id && <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Estado del Movimiento */}
                        <div className="space-y-2 pt-4 border-t border-stone-100">
                            <label className="text-sm font-bold text-teal-900">Estado de Liquidación</label>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                {['Pagado', 'Pendiente', 'Verificando'].map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setStatus(s)}
                                        className={cn(
                                            "flex-1 py-2 text-sm font-bold rounded-lg transition-all border",
                                            status === s
                                                ? s === 'Pagado' ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                                    : s === 'Pendiente' ? "bg-red-50 text-red-700 border-red-300"
                                                        : "bg-amber-50 text-amber-700 border-amber-300"
                                                : "bg-white text-stone-500 border-stone-200 hover:bg-stone-50"
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-stone-100 bg-white shrink-0">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={closeTransactionPanel}
                            className="flex-1 px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="transaction-form"
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-stone-900 px-6 py-3 rounded-xl font-bold shadow-lg shadow-yellow-500/30 transition-all flex items-center justify-center gap-2"
                        >
                            {editingTransactionData ? 'Guardar Cambios' : 'Registrar Movimiento'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
