import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Download, TrendingUp, TrendingDown, DollarSign, Wallet, CheckCircle2, AlertCircle, Clock, Plus, Edit2 } from 'lucide-react';
import { useUIStore } from '@/lib/uiStore';
import TransactionPanel from './components/TransactionPanel';

export default function SpecialistFinances() {
    const [month, setMonth] = useState('october');
    const { openTransactionPanel } = useUIStore();

    const kpis = [
        { title: "Ingresos Brutos (Octubre)", value: "$850.00", trend: "+12.5%", isPositive: true, icon: DollarSign },
        { title: "Pendiente por Cobrar", value: "$150.00", trend: "3 citas", isPositive: false, icon: AlertCircle },
        { title: "Reservas Pagadas", value: "18", trend: "+2", isPositive: true, icon: CheckCircle2 }
    ];

    const originBreakdown = [
        { name: "Pago Móvil", percentage: 45, amount: "$382.50", color: "bg-purple-500", textColor: "text-purple-700", bgLight: "bg-purple-50" },
        { name: "Binance (USDT)", percentage: 30, amount: "$255.00", color: "bg-yellow-500", textColor: "text-yellow-700", bgLight: "bg-yellow-50" },
        { name: "Efectivo ($)", percentage: 15, amount: "$127.50", color: "bg-emerald-500", textColor: "text-emerald-700", bgLight: "bg-emerald-50" },
        { name: "Zelle / Int.", percentage: 10, amount: "$85.00", color: "bg-blue-500", textColor: "text-blue-700", bgLight: "bg-blue-50" },
    ];

    const transactions = [
        { id: 'TRX-001', date: '25 Oct 2023', patient: 'Carlos Rodriguez', concept: 'Sesión Terapéutica', amount: '$50.00', method: 'Binance (USDT)', status: 'Pagado' },
        { id: 'TRX-002', date: '25 Oct 2023', patient: 'Ana Torres', concept: 'Coaching Ejecutivo', amount: '$75.00', method: 'Zelle', status: 'Pagado' },
        { id: 'TRX-003', date: '24 Oct 2023', patient: 'Luis Hernandez', concept: 'Sesión Terapéutica', amount: '$50.00', method: 'Efectivo ($)', status: 'Pagado' },
        { id: 'TRX-004', date: '24 Oct 2023', patient: 'Marta Salas', concept: 'Consulta Inicial', amount: '$40.00', method: 'Pago Móvil', status: 'Verificando' },
        { id: 'TRX-005', date: '23 Oct 2023', patient: 'Javier Mendez', concept: 'Sesión Terapéutica', amount: '$50.00', method: 'Por definir', status: 'Pendiente' },
        { id: 'TRX-006', date: '22 Oct 2023', patient: 'Patricia Leal', concept: 'Consultoría Corp.', amount: '$120.00', method: 'Pago Móvil', status: 'Pagado' },
        { id: 'TRX-007', date: '20 Oct 2023', patient: 'Roberto Diaz', concept: 'Sesión Terapéutica', amount: '$50.00', method: 'Binance (USDT)', status: 'Pagado' },
    ];

    const getMethodBadge = (method) => {
        switch (method) {
            case 'Pago Móvil': return "bg-purple-100 text-purple-800 border-purple-200";
            case 'Binance (USDT)': return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 'Efectivo ($)': return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case 'Zelle': return "bg-blue-100 text-blue-800 border-blue-200";
            default: return "bg-stone-100 text-stone-600 border-stone-200";
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pagado': return "bg-teal-50 text-teal-700 border-teal-200";
            case 'Pendiente': return "bg-red-50 text-red-700 border-red-200";
            case 'Verificando': return "bg-amber-50 text-amber-700 border-amber-200";
            default: return "bg-stone-50 text-stone-700 border-stone-200";
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <div>
                    <h2 className="font-display text-2xl text-teal-800">Control Financiero</h2>
                    <p className="text-stone-500 text-sm mt-1">Monitorea los ingresos y medios de pago de tus consultas.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                        onClick={() => openTransactionPanel()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-stone-900 rounded-xl transition-all text-sm font-bold shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Nuevo Movimiento</span>
                    </button>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                    >
                        <option value="october">Octubre 2023</option>
                        <option value="september">Septiembre 2023</option>
                        <option value="august">Agosto 2023</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 transition-colors text-sm font-bold shadow-sm">
                        <Download className="w-4 h-4" />
                        <span>Exportar PDF</span>
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpis.map((kpi, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <kpi.icon className="w-24 h-24" />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-teal-50 rounded-xl">
                                <kpi.icon className="w-5 h-5 text-teal-700" />
                            </div>
                            <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">{kpi.title}</h3>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                            <p className="font-display text-4xl text-teal-900">{kpi.value}</p>
                            <div className={cn(
                                "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg",
                                kpi.isPositive ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                            )}>
                                {kpi.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                <span>{kpi.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Metodos de Pago (Venezuela Centric) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <h3 className="font-display text-xl text-teal-800 mb-6 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-yellow-600" />
                        Origen de Fondos
                    </h3>

                    {/* Progress Bar */}
                    <div className="h-4 w-full rounded-full overflow-hidden flex mb-8 border border-stone-100 shadow-inner">
                        {originBreakdown.map((item, idx) => (
                            <div
                                key={idx}
                                style={{ width: `${item.percentage}%` }}
                                className={cn("h-full", item.color)}
                                title={`${item.name} (${item.percentage}%)`}
                            />
                        ))}
                    </div>

                    <div className="space-y-4">
                        {originBreakdown.map((item, idx) => (
                            <div key={idx} className={cn("flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-stone-100 transition-colors", item.bgLight)}>
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                    <div>
                                        <p className={cn("text-sm font-bold", item.textColor)}>{item.name}</p>
                                        <p className="text-xs text-stone-500">{item.percentage}% del total</p>
                                    </div>
                                </div>
                                <span className={cn("font-display text-lg", item.textColor)}>{item.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Historial de Transacciones */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                        <h3 className="font-display text-xl text-teal-800">Últimos Movimientos</h3>
                        <button className="text-sm font-bold text-yellow-600 hover:text-yellow-700 transition-colors">Ver todos</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-stone-50/50 text-stone-500 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-bold border-b border-stone-100">Paciente / Concepto</th>
                                    <th className="p-4 font-bold border-b border-stone-100">Fecha</th>
                                    <th className="p-4 font-bold border-b border-stone-100 text-center">Método</th>
                                    <th className="p-4 font-bold border-b border-stone-100 text-right">Monto</th>
                                    <th className="p-4 font-bold border-b border-stone-100 text-center">Estado</th>
                                    <th className="p-4 font-bold border-b border-stone-100 text-center w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {transactions.map((trx, idx) => (
                                    <tr key={idx} className="hover:bg-stone-50/50 transition-colors group">
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-teal-900">{trx.patient}</p>
                                            <p className="text-xs text-stone-500">{trx.concept}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-stone-600">{trx.date}</p>
                                            <p className="text-xs text-stone-400 font-mono">{trx.id}</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={cn("inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border", getMethodBadge(trx.method))}>
                                                {trx.method}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <p className="text-sm font-bold text-stone-800">{trx.amount}</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border", getStatusBadge(trx.status))}>
                                                {trx.status === 'Pagado' && <CheckCircle2 className="w-3 h-3" />}
                                                {trx.status === 'Pendiente' && <AlertCircle className="w-3 h-3" />}
                                                {trx.status === 'Verificando' && <Clock className="w-3 h-3" />}
                                                {trx.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => openTransactionPanel(trx)}
                                                className="p-2 text-stone-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                title="Editar Movimiento"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Slide-over panels */}
            <TransactionPanel />
        </div>
    );
}
