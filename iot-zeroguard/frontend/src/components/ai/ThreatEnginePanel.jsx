import React, { useState } from 'react';
import { useAIAnalysis } from '../../hooks/useAIAnalysis';
import ThreatReportCard from './ThreatReportCard';
import StreamingText from './StreamingText';
import { Sparkles, Brain, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThreatEnginePanel = ({ metrics, filename, onAnalyseRowRequest }) => {
    const { status, reportParts, error, startAnalysis, resetAnalysis } = useAIAnalysis();

    const handleGenerateClick = () => {
        startAnalysis(true, metrics); // trigger demo logic unconditionally for this phase
    };

    const handleRetry = () => {
        resetAnalysis();
        setTimeout(handleGenerateClick, 500);
    };

    return (
        <div className="w-full relative rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-900 shadow-[0_0_40px_rgba(168,85,247,0.15)] ai-section">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-8 py-6 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                                AI Threat Intelligence Engine
                            </h2>
                            <p className="text-sm font-medium text-slate-400 tracking-wide">
                                Powered by <span className="text-slate-300 font-bold">Claude AI</span> — Analysing your network threat patterns
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        {status !== 'idle' && (
                            <button
                                onClick={resetAnalysis}
                                className="btn-ai-outline flex-1 md:flex-none text-sm px-4 py-2 hover:bg-slate-800"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Reset
                            </button>
                        )}
                        <button
                            onClick={status === 'idle' ? handleGenerateClick : undefined}
                            disabled={status === 'loading' || status === 'streaming'}
                            className={`btn-ai flex-1 md:flex-none text-sm px-5 py-2 whitespace-nowrap ${(status === 'loading' || status === 'streaming') ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            {status === 'loading' || status === 'streaming' ? 'Generating...' : 'Generate Full Threat Report'}
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 min-h-[400px] flex items-center justify-center bg-slate-950/40">
                    <AnimatePresence mode="wait">

                        {status === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="max-w-2xl text-center flex flex-col items-center py-12"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full flex items-center justify-center mb-6 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                    <Brain className="w-12 h-12 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">AI Threat Analysis Ready</h3>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    Click <strong className="text-slate-300">Generate Full Threat Report</strong> to have Claude AI analyse all {metrics?.anomalies || '0'} detected anomalies and provide a comprehensive, actionable remediation strategy specific to your network architecture.
                                </p>
                                <div className="flex items-center gap-2 text-sm text-slate-500 font-mono bg-slate-900 border border-slate-700 px-4 py-2 rounded shadow-inner">
                                    <Lock className="w-4 h-4" /> Secure API Connection: Active
                                </div>
                            </motion.div>
                        )}

                        {status === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-20 w-full"
                            >
                                <div className="flex justify-center gap-3 mb-6">
                                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce shadow-[0_0_15px_#A855F7] [animation-delay:-0.3s]"></div>
                                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce shadow-[0_0_15px_#A855F7] [animation-delay:-0.15s]"></div>
                                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce shadow-[0_0_15px_#A855F7]"></div>
                                </div>
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2 tracking-widest uppercase">
                                    Claude AI is analysing your threat data
                                </h3>
                                <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
                                    Extracting payload signatures, correlating protocol anomalies, and drafting firewall rules...
                                </p>
                            </motion.div>
                        )}

                        {status === 'streaming' && (
                            <motion.div
                                key="streaming"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full max-w-4xl max-h-[60vh]"
                            >
                                <StreamingText text={reportParts} />
                            </motion.div>
                        )}

                        {status === 'complete' && (
                            <motion.div
                                key="complete"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="w-full max-w-5xl"
                            >
                                <ThreatReportCard report={reportParts} filename={filename} />
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center p-12 bg-red-900/10 border border-red-500/30 rounded-xl"
                            >
                                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                                <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
                                <p className="text-slate-400 mb-6">{error || 'An unexpected error occurred during API communication.'}</p>
                                <button onClick={handleRetry} className="btn-primary bg-red-600 hover:bg-red-500 shadow-red-600/30">
                                    Retry Connection
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ThreatEnginePanel;
