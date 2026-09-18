import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TerminalSquare, Copy, ChevronRight } from 'lucide-react';
import ThreatBadge from './ThreatBadge';

const SingleThreatModal = ({ isOpen, onClose, data, aiStatus, aiReport }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-6xl max-h-full flex flex-col md:flex-row overflow-hidden relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left Panel - Packet Details */}
                    <div className="w-full md:w-1/3 bg-slate-950 border-r border-slate-800 flex flex-col h-[50vh] md:h-auto overflow-y-auto">
                        <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-950/90 z-10 backdrop-blur-md">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                                <TerminalSquare className="w-5 h-5 text-teal-400" />
                                Raw Flow Details
                            </h3>
                            <div className="flex gap-2">
                                <ThreatBadge type="CRITICAL" />
                                <ThreatBadge text={data.protocol} />
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="text-xs uppercase font-bold text-slate-500 mb-3 border-b border-slate-800 pb-1">Identification</h4>
                                <div className="grid grid-cols-2 gap-y-3 font-mono text-xs">
                                    <div className="text-slate-400">Timestamp:</div>
                                    <div className="text-slate-200">{data.timestamp}</div>
                                    <div className="text-slate-400">Protocol:</div>
                                    <div className="text-teal-400 font-bold">{data.protocol}</div>
                                    <div className="text-slate-400">Duration:</div>
                                    <div className="text-slate-200">{data.duration}ms</div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase font-bold text-slate-500 mb-3 border-b border-slate-800 pb-1">Payload Metrics</h4>
                                <div className="grid grid-cols-2 gap-y-3 font-mono text-xs">
                                    <div className="text-slate-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-red-500" /> Src Bytes:</div>
                                    <div className="text-red-400 font-bold bg-red-500/10 px-1 rounded">{data.src_bytes.toLocaleString()}</div>
                                    <div className="text-slate-400">Dst Bytes:</div>
                                    <div className="text-slate-200">{data.dst_bytes.toLocaleString()}</div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase font-bold text-slate-500 mb-3 border-b border-slate-800 pb-1">Model Inference Scores</h4>
                                <div className="grid grid-cols-2 gap-y-3 font-mono text-xs">
                                    <div className="text-slate-400">Ensemble:</div>
                                    <div className="text-slate-200 font-bold">{data.ensemble_score}</div>
                                    <div className="text-slate-400">Confidence:</div>
                                    <div className="text-slate-200">{data.confidence}%</div>
                                    <div className="text-slate-400">Prediction:</div>
                                    <div className="text-red-400 font-bold">{data.prediction}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - AI Analysis */}
                    <div className="w-full md:w-2/3 flex flex-col h-[50vh] md:h-auto ai-section relative overflow-hidden bg-slate-900 border-l-4 border-l-purple-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>

                        <div className="p-6 border-b border-purple-500/20 sticky top-0 bg-slate-900/90 z-10 backdrop-blur-md flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                                <div>
                                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                                        AI Threat Analysis
                                    </h3>
                                    <p className="text-xs font-mono text-slate-400 mt-0.5">Analysing specific flow packet characteristics</p>
                                </div>
                            </div>

                            {aiStatus === 'complete' && (
                                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded border border-slate-700">
                                    <Copy className="w-3 h-3" /> Copy
                                </button>
                            )}
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 h-[400px]">
                            {aiStatus === 'loading' && (
                                <div className="flex flex-col items-center justify-center h-full space-y-6">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
                                    </div>
                                    <p className="font-mono text-purple-400 text-sm font-bold tracking-widest text-shadow-sm shadow-purple-900">CLAUDE IS ANALYSING...</p>
                                </div>
                            )}

                            {aiStatus === 'streaming' && (
                                <div className="prose prose-invert prose-p:text-slate-300">
                                    <div className="font-mono text-xs text-purple-400 mb-6 pb-2 border-b border-purple-500/30">Claude Streaming Connection [ACTIVE]</div>
                                    <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{aiReport}</div>
                                </div>
                            )}

                            {aiStatus === 'complete' && (
                                <div className="prose prose-invert prose-sm max-w-none prose-p:text-slate-300 prose-headings:text-slate-100">
                                    <div className="font-mono text-xs text-green-400 mb-6 pb-2 border-b border-green-500/30 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Analysis Complete
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-teal-400 font-bold mb-1">Threat Type</h4>
                                            <p className="font-bold text-white text-lg">Targeted SYN Flood (DoS)</p>
                                        </div>
                                        <div>
                                            <h4 className="text-red-400 font-bold mb-1">Why was this flagged?</h4>
                                            <p>The \`src_bytes\` value of {data.src_bytes.toLocaleString()} is exceptionally abnormal for a single {data.protocol} packet payload in this network segment. The deviation combined with the high ensemble score ({data.ensemble_score}) indicates an active denial of service attempt aiming to exhaust broker connection limits.</p>
                                        </div>
                                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-4">
                                            <h4 className="text-slate-400 font-bold mb-2 uppercase text-xs tracking-widest">Immediate Mitigation Rule</h4>
                                            <code className="text-teal-400 font-mono text-xs block">
                                                iptables -I INPUT -p {data.protocol.toLowerCase()} -m connlimit --connlimit-above 50 -j REJECT
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SingleThreatModal;
