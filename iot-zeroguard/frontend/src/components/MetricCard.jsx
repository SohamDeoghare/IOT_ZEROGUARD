import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({
    title,
    value,
    icon: Icon,
    color = "teal",
    isRed = false,
    isGreen = false,
    trend,
    trendDirection,
    suffix = ""
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endValue = parseFloat(value.toString().replace(/,/g, ''));
        if (isNaN(endValue)) {
            setCount(value);
            return;
        }

        // Quick counter animation
        const duration = 1.5;
        const incrementTime = (duration / endValue) * 1000;
        const interval = setInterval(() => {
            start += endValue / (duration * 60);
            if (start >= endValue) {
                setCount(endValue);
                clearInterval(interval);
            } else {
                setCount(Math.ceil(start));
            }
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [value]);

    const displayValue = typeof count === 'number' && typeof value === 'string' && value.includes(',')
        ? count.toLocaleString()
        : (typeof count === 'number' && !Number.isInteger(count) ? count.toFixed(1) : count);

    const finalDisplay = isNaN(parseFloat(value)) ? value : displayValue;

    const colorMap = {
        teal: "text-teal-400 bg-teal-400/10 border-teal-400/20",
        indigo: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
        purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        red: "text-red-400 bg-red-400/10 border-red-400/20",
        green: "text-green-400 bg-green-400/10 border-green-400/20",
        amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    };

    const currentTheme = isRed ? colorMap['red'] : (isGreen ? colorMap['green'] : colorMap[color]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card border-l-4 transition-all duration-300 hover:shadow-lg ${currentTheme.split(' ')[0].replace('text-', 'border-l-')}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="metric-label">{title}</span>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className={`metric-value ${isRed ? 'text-red-400' : (isGreen ? 'text-green-400' : 'text-slate-100')}`}>
                            {finalDisplay}
                        </span>
                        <span className="text-sm font-bold text-slate-500">{suffix}</span>
                    </div>
                </div>
                <div className={`p-3 rounded-lg border ${currentTheme}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            {trend && (
                <div className="flex items-center gap-1.5 mt-2">
                    {trendDirection === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {trendDirection === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                    {trendDirection === 'neutral' && <Minus className="w-4 h-4 text-slate-400" />}

                    <span className={`text-xs font-medium font-mono px-2 py-0.5 rounded-full ${trendDirection === 'down' && isRed ? 'bg-red-500/10 text-red-400' :
                            trendDirection === 'up' && isGreen ? 'bg-green-500/10 text-green-400' :
                                'bg-slate-700 text-slate-300'
                        }`}>
                        {trend}
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default MetricCard;
