import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard';
import { ListFilter } from 'lucide-react';

const FeatureImportance = ({ data }) => {
    // Sort data from lowest to highest for horizontal rendering
    const sortedData = [...(data || [])].sort((a, b) => a.importance - b.importance);

    return (
        <ChartCard
            title="Top 10 Influential Features"
            icon={ListFilter}
            color="indigo"
            className="h-[400px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={sortedData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#14B8A6" />
                            <stop offset="100%" stopColor="#6366F1" />
                        </linearGradient>
                    </defs>
                    <XAxis
                        type="number"
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.toFixed(2)}
                        domain={[0, 'dataMax']}
                    />
                    <YAxis
                        dataKey="name"
                        type="category"
                        stroke="#94A3B8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={120}
                    />
                    <Tooltip
                        cursor={{ fill: '#334155', opacity: 0.2 }}
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F1F5F9' }}
                        itemStyle={{ color: '#F1F5F9' }}
                        labelStyle={{ color: '#94A3B8', fontWeight: 'bold' }}
                        formatter={(value) => [value.toFixed(3), "Importance"]}
                    />
                    <Bar
                        dataKey="importance"
                        fill="url(#barGradient)"
                        radius={[0, 4, 4, 0]}
                        barSize={16}
                        isAnimationActive={true}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default FeatureImportance;
