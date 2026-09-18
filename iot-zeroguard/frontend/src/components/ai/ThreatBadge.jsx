import React from 'react';

const ThreatBadge = ({ type, text }) => {
    const badgeStyles = {
        CRITICAL: 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse-fast',
        HIGH: 'bg-orange-500/20 text-orange-500 border-orange-500/50',
        MEDIUM: 'bg-amber-500/20 text-amber-500 border-amber-500/50',
        LOW: 'bg-green-500/20 text-green-500 border-green-500/50',
        default: 'bg-slate-700 text-slate-300 border-slate-600',
    };

    const style = badgeStyles[type] || badgeStyles.default;

    return (
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border rounded bg-opacity-10 shadow-sm ${style}`}>
            {text || type}
        </span>
    );
};

export default ThreatBadge;
