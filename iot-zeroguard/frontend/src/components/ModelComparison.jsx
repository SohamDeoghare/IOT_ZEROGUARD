import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard';
import { Brain } from 'lucide-react';

const ModelComparison = ({ data }) => {
    // We need to map the timeseries to multiple models.
    // We'll generate slightly different curves based on the base 'score' for visual effect,
    // since demoData only provides one score.

    const formattedData = data.map((d, i) => ({
        time: `${(d.index / 1000).toFixed(1)}s`,
        ensemble: d.score,
        isolationForest: Math.min(1, Math.max(0, d.score + (Math.sin(i) * 0.1))),
        autoencoder: Math.min(1, Math.max(0, d.score - (Math.cos(i) * 0.15))),
    }));

    return (
        <ChartCard title="Model Score Comparison" icon={Brain} color="purple" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                    <XAxis
                        dataKey="time"
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
                        domain={[0, 1]}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#F1F5F9' }}
                        formatter={(value) => value.toFixed(3)}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />

                    <Line
                        type="monotone"
                        dataKey="ensemble"
                        name="Ensemble"
                        stroke="#F1F5F9"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        activeDot={{ r: 4, fill: '#F1F5F9', stroke: '#1E293B', strokeWidth: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="isolationForest"
                        name="Isolation Forest"
                        stroke="#14B8A6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#14B8A6', stroke: '#1E293B', strokeWidth: 2 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="autoencoder"
                        name="Autoencoder"
                        stroke="#6366F1"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, fill: '#6366F1', stroke: '#1E293B', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};

export default ModelComparison;
