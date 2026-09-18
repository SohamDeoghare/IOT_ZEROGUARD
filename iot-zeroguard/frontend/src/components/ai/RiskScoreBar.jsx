import React from 'react';
import { motion } from 'framer-motion';

const RiskScoreBar = ({ before, after }) => {
    const getScoreColor = (score) => {
        if (score > 7) return 'bg-red-500 shadow-[0_0_10px_#EF4444]';
        if (score > 4) return 'bg-amber-500 shadow-[0_0_10px_#F59E0B]';
        return 'bg-green-500 shadow-[0_0_10px_#22C55E]';
    };

    const beforePercent = (before / 10) * 100;
    const afterPercent = (after / 10) * 100;

    return (
        <div className="bg-slate-900 border border-slate-700/80 rounded-lg p-5 mt-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none"></div>

            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Risk Reduction Outlook</h3>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold text-slate-300">Before Remediation (Current Risk)</span>
                        <span className="font-mono font-bold text-red-400 text-xl">{before.toFixed(1)}<span className="text-sm text-slate-500">/10</span></span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${beforePercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${getScoreColor(before)}`}
                        />
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-4">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold text-slate-300">After Implementation (Residual Risk)</span>
                        <span className="font-mono font-bold text-green-400 text-xl">{after.toFixed(1)}<span className="text-sm text-slate-500">/10</span></span>
                    </div>
                    <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 bg-opacity-50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${afterPercent}%` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className={`h-full ${getScoreColor(after)}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskScoreBar;
