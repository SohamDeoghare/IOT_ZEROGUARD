import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { ShieldAlert } from 'lucide-react';

const TrafficDonut = ({ metrics }) => {
    const anomalies = metrics?.anomalies || 0;
    const normal = metrics?.normal || 0;

    // Calculate borderline based on typical statistical distributions (dummy logic for visual)
    const borderline = Math.floor(normal * 0.05);
    const adjustedNormal = normal - borderline;

    const total = anomalies + normal;

    const data = [
        { name: 'Normal', value: adjustedNormal, color: '#14B8A6' },
        { name: 'Anomaly', value: anomalies, color: '#EF4444' },
        { name: 'Borderline', value: borderline, color: '#F59E0B' },
    ];

    const formatPercentage = (value) => {
        if (total === 0) return '0%';
        return `${((value / total) * 100).toFixed(1)}%`;
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-lg text-sm">
                    <p className="font-bold mb-1" style={{ color: data.color }}>{data.name}</p>
                    <div className="flex gap-4 opacity-90 text-white">
                        <span>Count: {data.value.toLocaleString()}</span>
                        <span>{formatPercentage(data.value)}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom legend that matches the design requirements
    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <ul className="flex flex-col gap-2 mt-4 ml-8">
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                        <span className="text-slate-300 w-20">{entry.value}</span>
                        <span className="text-slate-400 font-mono text-xs">{entry.payload.value.toLocaleString()} ({formatPercentage(entry.payload.value)})</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <ChartCard title="Traffic Classification" icon={ShieldAlert} color="indigo" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="35%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="right" />

                    {/* Centered Total */}
                    <text
                        x="35%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white font-extrabold text-2xl"
                    >
                        {total.toLocaleString()}
                    </text>
                    <text
                        x="35%"
                        y="56%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-slate-400 text-xs font-bold tracking-widest uppercase"
                    >
                        Total Packets
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default TrafficDonut;
