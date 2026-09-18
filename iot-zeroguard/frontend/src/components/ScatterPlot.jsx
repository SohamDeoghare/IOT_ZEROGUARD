import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceArea } from 'recharts';
import ChartCard from './ChartCard';
import { Network } from 'lucide-react';

const ScatterPlot = ({ data }) => {
    const [zoomRefArea, setZoomRefArea] = useState({ refAreaLeft: '', refAreaRight: '', bottom: '', top: '' });
    const [zoomState, setZoomState] = useState({
        left: 'dataMin',
        right: 'dataMax',
        top: 'dataMax',
        bottom: 'dataMin',
        animation: true,
    });

    const zoom = () => {
        let { refAreaLeft, refAreaRight } = zoomRefArea;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            setZoomRefArea({ refAreaLeft: '', refAreaRight: '' });
            return;
        }

        if (refAreaLeft > refAreaRight) {
            [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
        }

        setZoomState({ ...zoomState, left: refAreaLeft, right: refAreaRight });
        setZoomRefArea({ refAreaLeft: '', refAreaRight: '' });
    };

    const zoomOut = () => {
        setZoomState({
            left: 'dataMin',
            right: 'dataMax',
            top: 'dataMax',
            bottom: 'dataMin',
        });
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-lg text-xs font-mono">
                    <p className="font-bold mb-2 text-white border-b border-slate-700 pb-1">
                        Packet ID: {data.id}
                    </p>
                    <div className="flex justify-between gap-4 mb-1">
                        <span className="text-slate-400">PCA Component 1:</span>
                        <span className="text-teal-400">{data.x.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between gap-4 mb-2">
                        <span className="text-slate-400">PCA Component 2:</span>
                        <span className="text-teal-400">{data.y.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900 px-2 py-1 rounded">
                        <span className="text-slate-500 font-sans font-medium">Class:</span>
                        <span className={data.type === 'Anomaly' ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                            {data.type}
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="relative h-[400px]">
            <ChartCard title="Normal vs Anomaly Clusters" icon={Network} color="teal" className="h-[400px] absolute inset-0 w-full">
                {zoomState.left !== 'dataMin' && (
                    <button
                        onClick={zoomOut}
                        className="absolute top-4 right-4 z-10 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors text-white"
                    >
                        Reset Zoom
                    </button>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                        onMouseDown={(e) => e && setZoomRefArea({ ...zoomRefArea, refAreaLeft: e.activeLabel })}
                        onMouseMove={(e) => zoomRefArea.refAreaLeft && e && setZoomRefArea({ ...zoomRefArea, refAreaRight: e.activeLabel })}
                        onMouseUp={zoom}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Component 1"
                            domain={[zoomState.left, zoomState.right]}
                            stroke="#94A3B8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val.toFixed(1)}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Component 2"
                            domain={[zoomState.bottom, zoomState.top]}
                            stroke="#94A3B8"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => val.toFixed(1)}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#334155' }} />

                        <Scatter name="Clusters" data={data} opacity={0.8}>
                            {(data || []).map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.type === 'Anomaly' ? '#EF4444' : '#14B8A6'}
                                    className={entry.type === 'Anomaly' ? 'drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] cursor-pointer hover:opacity-100' : 'cursor-pointer hover:opacity-100'}
                                />
                            ))}
                        </Scatter>

                        {zoomRefArea.refAreaLeft && zoomRefArea.refAreaRight ? (
                            <ReferenceArea x1={zoomRefArea.refAreaLeft} x2={zoomRefArea.refAreaRight} strokeOpacity={0.3} fill="#14B8A6" fillOpacity={0.1} />
                        ) : null}

                    </ScatterChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
};

export default ScatterPlot;
