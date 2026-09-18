import React, { useCallback, useState } from 'react';
import { UploadCloud, FileType, CheckCircle2, AlertCircle, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadZone = ({ onUpload, onDemo }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === "text/csv" || file.name.endsWith('.csv')) {
                setSelectedFile(file);
            } else {
                alert("Please upload a raw CSV file.");
            }
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleRunAnalysis = () => {
        if (selectedFile) {
            onUpload(selectedFile);
        }
    };

    return (
        <div className="w-full flex justify-center items-center min-h-[calc(100vh-140px)]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-xl w-full"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-white">Network Traffic Analysis</h2>
                    <p className="text-slate-400">Upload your IoT capture data or try the pre-analysed demo</p>
                </div>

                {!selectedFile ? (
                    <div className="space-y-6">
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${dragActive
                                    ? "border-teal-400 bg-teal-500/10 scale-[1.02]"
                                    : "border-teal-500/30 bg-slate-800/50 hover:border-teal-400/50 hover:bg-slate-800"
                                }`}
                        >
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <motion.div
                                animate={dragActive ? { y: -10 } : { y: 0 }}
                                className="bg-teal-500/20 p-4 rounded-full mb-4"
                            >
                                <UploadCloud className="w-10 h-10 text-teal-400 animate-pulse" />
                            </motion.div>
                            <p className="text-xl font-bold text-white mb-2">Drop your IoT network traffic CSV here</p>
                            <p className="text-sm text-slate-400 mb-6 font-mono">Supported: NSL-KDD format, 41 features</p>

                            <button type="button" className="btn-primary relative z-20 pointer-events-none">
                                Browse File
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative bg-slate-900 px-4 text-sm text-slate-500 font-medium">OR</div>
                        </div>

                        <button
                            onClick={onDemo}
                            className="w-full btn-ai-outline py-4 justify-center text-lg"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Try Demo Mode
                        </button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card bg-slate-800 border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)]"
                    >
                        <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                            <div className="bg-teal-500/20 p-3 rounded-lg">
                                <FileType className="w-8 h-8 text-teal-400" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h4 className="font-bold text-white truncate">{selectedFile.name}</h4>
                                <p className="text-sm text-slate-400 font-mono">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • CSV
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-500/10 p-2 rounded border border-green-500/20">
                                <CheckCircle2 className="w-4 h-4" /> Valid extension (.csv)
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-500/10 p-2 rounded border border-green-500/20">
                                <CheckCircle2 className="w-4 h-4" /> Size within limits
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 p-2 rounded border border-slate-700">
                                <AlertCircle className="w-4 h-4 text-purple-400" /> Columns will be validated during preprocessing
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="btn-outline flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRunAnalysis}
                                className="btn-primary flex-1"
                            >
                                Run Analysis + AI Report
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default UploadZone;
