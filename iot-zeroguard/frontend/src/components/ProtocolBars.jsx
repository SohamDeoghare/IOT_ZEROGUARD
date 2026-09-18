import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from './ChartCard';
import { Layers } from 'lucide-react';

const ProtocolBars = ({ data }) => {
    // Find highest anomaly count to highlight red
    const maxAnomaly = data ? Math.max(...data.map(d => d.anomaly)) : 0;

    return (
        <ChartCard title="Anomalies by Protocol" icon={Layers} color="slate" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                    />
                    <Tooltip
                        cursor={{ fill: '#334155', opacity: 0.2 }}
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F1F5F9' }}
                        itemStyle={{ color: '#F1F5F9' }}
                        labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                        formatter={(value) => [value.toLocaleString(), "Anomalies"]}
                    />
                    <Bar dataKey="anomaly" radius={[4, 4, 0, 0]} isAnimationActive={true}>
                        {
                            (data || []).map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.anomaly === maxAnomaly ? '#EF4444' : '#14B8A6'}
                                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default ProtocolBars;
