import React, { useState } from 'react';
import { AlertTriangle, ChevronLeft, ChevronRight, Search, Sparkles } from 'lucide-react';

const AlertsTable = ({ alerts, onAnalyseThreat }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterProtocol, setFilterProtocol] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter Data
    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = Object.values(alert).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesProtocol = filterProtocol === 'All' || alert.protocol === filterProtocol;
        return matchesSearch && matchesProtocol;
    });

    // Pagination
    const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAlerts = filteredAlerts.slice(startIndex, startIndex + itemsPerPage);

    // Styling helpers
    const getScoreColor = (score) => {
        const val = parseFloat(score);
        if (val > 0.8) return 'text-red-400 font-bold';
        if (val > 0.6) return 'text-amber-400 font-semibold';
        return 'text-green-400';
    };

    const getConfidenceColor = (conf) => {
        const val = parseFloat(conf);
        if (val > 90) return 'text-red-400 font-bold';
        if (val > 75) return 'text-amber-400 font-medium';
        return 'text-teal-400';
    };

    const protocols = ['All', ...new Set(alerts.map(a => a.protocol))];

    return (
        <div className="card w-full flex flex-col h-full bg-slate-800/90 border-red-500/20 shadow-lg p-0 overflow-hidden">

            {/* Header & Controls */}
            <div className="p-5 border-b border-slate-700/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight text-slate-100">Detected Anomaly Events</h3>
                        <p className="text-xs text-slate-400 font-medium">Critical network anomalies requiring attention</p>
                    </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-100 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all font-mono"
                        />
                    </div>
                    <select
                        value={filterProtocol}
                        onChange={(e) => setFilterProtocol(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-sm text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500/50 cursor-pointer font-medium"
                    >
                        {protocols.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto flex-1 bg-slate-900/40">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800 border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400 font-bold sticky top-0 z-10 shadow-sm">
                            <th className="px-4 py-3 text-center">#</th>
                            <th className="px-4 py-3">Timestamp</th>
                            <th className="px-4 py-3">Protocol</th>
                            <th className="px-4 py-3 text-right">Src Bytes</th>
                            <th className="px-4 py-3 text-right">Dst Bytes</th>
                            <th className="px-4 py-3 text-right">Score</th>
                            <th className="px-4 py-3 text-right">Confidence</th>
                            <th className="px-4 py-3 text-center">Prediction</th>
                            <th className="px-4 py-3 text-center sticky right-0 bg-slate-800 z-20 w-40">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 font-mono text-sm">
                        {currentAlerts.length > 0 ? (
                            currentAlerts.map((alert, idx) => (
                                <tr key={idx} className="hover:bg-slate-800/80 transition-colors group">
                                    <td className="px-4 py-3 text-center text-slate-500 border-l-[3px] border-l-red-500 bg-red-500/5">{startIndex + idx + 1}</td>
                                    <td className="px-4 py-3 text-slate-300">{alert.timestamp}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 rounded text-xs font-semibold bg-slate-800 border border-slate-600 text-teal-400">
                                            {alert.protocol}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-slate-300">{alert.src_bytes.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right text-slate-300">{alert.dst_bytes.toLocaleString()}</td>
                                    <td className={`px-4 py-3 text-right ${getScoreColor(alert.ensemble_score)}`}>{alert.ensemble_score}</td>
                                    <td className={`px-4 py-3 text-right ${getConfidenceColor(alert.confidence)}`}>{alert.confidence}%</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest bg-red-500/20 text-red-400 border border-red-500/30 uppercase flex items-center justify-center gap-1.5 w-max mx-auto shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-pulse-fast">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                            {alert.prediction}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center sticky right-0 bg-slate-900/40 group-hover:bg-slate-800/80 transition-colors">
                                        <button
                                            onClick={() => onAnalyseThreat(alert)}
                                            className="inline-flex items-center gap-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/50 px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all duration-200 shadow-sm"
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            Analyse
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-4 py-12 text-center text-slate-500 font-sans">
                                    No alerts found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-5 py-3 border-t border-slate-700 bg-slate-800 flex items-center justify-between text-sm">
                <span className="text-slate-400">
                    Showing <strong className="text-slate-200">{filteredAlerts.length > 0 ? startIndex + 1 : 0}</strong> to <strong className="text-slate-200">{Math.min(startIndex + itemsPerPage, filteredAlerts.length)}</strong> of <strong className="text-slate-200">{filteredAlerts.length}</strong> events
                </span>
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="p-1.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-slate-300 font-medium px-2 py-1 bg-slate-900 rounded border border-slate-700">
                        Page {currentPage} / {totalPages || 1}
                    </span>
                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="p-1.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AlertsTable;
