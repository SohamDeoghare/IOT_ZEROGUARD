import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import ChartCard from '../components/ChartCard';
import { Activity } from 'lucide-react';

const AnomalyTimeseries = ({ data }) => {
    return (
        <ChartCard title="Anomaly Score Over Time" icon={Activity} color="teal" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorAnomaly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                    <XAxis
                        dataKey="index"
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <YAxis
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 1]}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F1F5F9' }}
                        itemStyle={{ color: '#F1F5F9' }}
                        labelStyle={{ color: '#94A3B8' }}
                        formatter={(value, name) => [Number(value).toFixed(2), "Anomaly Score"]}
                        labelFormatter={(label) => `Packet: ${label}`}
                    />
                    <ReferenceLine y={0.6} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Threshold 0.6', fill: '#EF4444', fontSize: 12 }} />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke={(d) => d && d.score > 0.6 ? '#EF4444' : '#14B8A6'}
                        fill="url(#colorScore)"
                        fillOpacity={1}
                        isAnimationActive={true}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default AnomalyTimeseries;
