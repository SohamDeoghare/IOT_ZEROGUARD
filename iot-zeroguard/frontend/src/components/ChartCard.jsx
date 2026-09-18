import React from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, icon: Icon, children, color = "teal", className = "" }) => {
    const colorMap = {
        teal: "text-teal-400 bg-teal-400/10 border-teal-400/20",
        indigo: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
        purple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
        amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        slate: "text-slate-400 bg-slate-400/10 border-slate-400/20",
    };

    const currentTheme = colorMap[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card flex flex-col h-full bg-slate-800/90 border border-slate-700/80 shadow-md p-5 ${className}`}
        >
            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                <div className={`p-2 rounded-lg border ${currentTheme}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-300">
                    {title}
                </h3>
            </div>

            <div className="flex-1 w-full min-h-[250px] relative">
                {children}
            </div>
        </motion.div>
    );
};

export default ChartCard;
