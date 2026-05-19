"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface TrafficChartProps {
    data: { date: string; count: number }[];
}

export default function TrafficChart({ data }: TrafficChartProps) {
    // Format dates for display (e.g. "2026-05-19" -> "19 Mei")
    const formattedData = data.map((item) => {
        const dateObj = new Date(item.date);
        const day = dateObj.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const month = monthNames[dateObj.getMonth()];
        return {
            displayDate: isNaN(day) ? item.date : `${day} ${month}`,
            Kunjungan: item.count,
        };
    });

    if (data.length === 0) {
        return (
            <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-semibold">Belum ada data kunjungan hari ini</p>
                <p className="text-slate-400 text-xs mt-1">Data akan otomatis muncul ketika ada pengunjung</p>
            </div>
        );
    }

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                        dataKey="displayDate" 
                        stroke="#94A3B8" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                        dy={10}
                    />
                    <YAxis 
                        stroke="#94A3B8" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                        allowDecimals={false}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: "#1E293B", 
                            border: "none", 
                            borderRadius: "12px", 
                            color: "#fff",
                            fontSize: "12px"
                        }} 
                        labelStyle={{ fontWeight: "bold", color: "#94A3B8" }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="Kunjungan" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorVisits)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
