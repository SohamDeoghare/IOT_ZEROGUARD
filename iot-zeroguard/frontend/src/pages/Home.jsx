import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, Cpu, Brain, BarChart3, Sparkles, UploadCloud, ChevronRight, Activity, Server, Zap, Lock, Terminal, ActivitySquare, CheckCircle2 } from 'lucide-react';

// Reusable Counter component for stats
const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endValue = parseFloat(end.replace(/,/g, ''));
        if (isNaN(endValue)) {
            setCount(end);
            return;
        }

        // Simple counter animation
        const incrementTime = (duration / endValue) * 1000;
        const interval = setInterval(() => {
            start += endValue / (duration * 60); // Assuming 60fps
            if (start >= endValue) {
                setCount(endValue);
                clearInterval(interval);
            } else {
                setCount(Math.ceil(start));
            }
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [end, duration]);

    const displayValue = typeof count === 'number' && end.includes(',')
        ? count.toLocaleString()
        : (typeof count === 'number' && count > 1000 && !end.includes('%') ? (count / 1000).toFixed(0) + 'K' : count);

    return <span>{displayValue}{suffix}</span>;
};

const NetworkNode = ({ cx, cy, delay, isAnomaly }) => (
    <motion.circle
        cx={cx}
        cy={cy}
        r="6"
        fill={isAnomaly ? "#EF4444" : "#14B8A6"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: isAnomaly ? [1, 1.5, 1] : 1,
            opacity: [0.5, 1, 0.5]
        }}
        transition={{
            scale: isAnomaly ? { duration: 2, repeat: Infinity } : { duration: 0.5, delay },
            opacity: { duration: 3, repeat: Infinity, delay: isAnomaly ? 0 : delay * 2 }
        }}
    />
);

const Home = () => {
    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center overflow-hidden py-12 md:py-20 lg:py-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Background glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">

                    {/* Hero Left Side */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-fast"></div>
                            <span className="text-teal-400 text-sm font-semibold tracking-wide uppercase">AI-Powered Security</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tighter"
                        >
                            Detect Zero-Day Attacks
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
                                Before They Strike
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed"
                        >
                            Advanced unsupervised ML ensemble detects unknown IoT network threats in real time — then our <span className="text-purple-400 font-semibold">AI engine</span> delivers precise, actionable solutions tailored to your exact threat profile.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
                        >
                            <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                                Analyse Your Network
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Link>
                            <a href="#how-it-works" className="btn-outline text-lg px-8 py-4 w-full sm:w-auto">
                                How It Works
                            </a>
                        </motion.div>

                        {/* Trust Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                                99.2% Detection Rate
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                AI-Powered Solutions
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Real-time Analysis
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Right Side */}
                    <div className="lg:col-span-5 relative h-[500px] w-full hidden lg:block">
                        {/* Abstract Network Animation */}
                        <div className="absolute inset-0 z-0">
                            <svg className="w-full h-full" viewBox="0 0 400 500">
                                {/* Lines */}
                                <motion.path d="M100,200 L200,100 L300,150 L250,300 L150,350 Z" stroke="#334155" strokeWidth="1" fill="none"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
                                <motion.path d="M200,100 L250,300 M100,200 L150,350 M300,150 L200,400" stroke="#334155" strokeWidth="1" fill="none"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }} />
                                <motion.path d="M250,300 L200,400 L150,350" stroke="#334155" strokeWidth="1" fill="none"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 1 }} />

                                {/* Anomaly Connection */}
                                <motion.path d="M250,300 L320,380" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }} transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }} />

                                {/* Nodes */}
                                <NetworkNode cx="200" cy="100" delay={0.1} />
                                <NetworkNode cx="300" cy="150" delay={0.3} />
                                <NetworkNode cx="100" cy="200" delay={0.5} />
                                <NetworkNode cx="250" cy="300" delay={0.7} />
                                <NetworkNode cx="150" cy="350" delay={0.9} />
                                <NetworkNode cx="200" cy="400" delay={1.1} />

                                {/* Anomaly Node */}
                                <NetworkNode cx="320" cy="380" delay={0} isAnomaly={true} />
                            </svg>
                        </div>

                        {/* Floating AI Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                            transition={{ opacity: { duration: 0.8, delay: 1 }, x: { duration: 0.8, delay: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                            className="absolute bottom-10 -left-10 right-10 bg-slate-800/90 backdrop-blur-md border hover:border-purple-500/50 border-slate-700/80 rounded-xl p-5 shadow-2xl shadow-purple-900/20 ai-section"
                        >
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                    <span className="font-semibold text-slate-200">AI Threat Intelligence</span>
                                </div>
                                <span className="text-xs font-mono bg-red-500/20 text-red-400 px-2 py-1 rounded">CRITICAL</span>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-700/50 rounded-md w-3/4"></div>
                                <div className="h-4 bg-slate-700/50 rounded-md w-full"></div>
                                <div className="h-4 bg-slate-700/50 rounded-md w-5/6"></div>

                                <div className="mt-4 pt-3 border-t border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-2 text-sm text-slate-300">
                                        <Terminal className="w-4 h-4 text-purple-400" />
                                        <span>Recommended Action</span>
                                    </div>
                                    <div className="bg-slate-900/80 p-2 border border-slate-800 rounded text-xs font-mono text-teal-300">
                                        iptables -A INPUT -s 192.168.1.100 -j DROP
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* STATS STRIP */}
            <section className="bg-slate-800 border-y border-slate-700 py-12 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">

                        <div className="flex flex-col items-center">
                            <span className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tabular-nums">
                                <AnimatedCounter end="125K+" suffix="+" />
                            </span>
                            <span className="text-sm uppercase tracking-widest text-slate-400 font-medium">Packets Analysed</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tabular-nums">
                                <AnimatedCounter end="3" />
                            </span>
                            <span className="text-sm uppercase tracking-widest text-slate-400 font-medium tracking-tight">ML Models (Ensemble)</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2 tabular-nums flex items-center justify-center">
                                <Sparkles className="w-8 h-8 mr-2 text-purple-500" /> AI
                            </span>
                            <span className="text-sm uppercase tracking-widest text-slate-400 font-medium">Powered Remediation</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tabular-nums">
                                &lt;50<span className="text-2xl text-teal-400">ms</span>
                            </span>
                            <span className="text-sm uppercase tracking-widest text-slate-400 font-medium">Detection Latency</span>
                        </div>

                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section id="how-it-works" className="py-24 bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h2 className="text-sm uppercase tracking-widest text-teal-500 font-bold mb-3">Workflow</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-white">From Raw Traffic to <span className="text-purple-400">AI-Guided Response</span></h3>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-slate-800 z-0">
                            <div className="h-full bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 w-full opacity-50"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-lg relative group transition-transform hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <UploadCloud className="w-10 h-10 text-teal-400" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-slate-400 text-sm">1</div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Upload CSV</h4>
                                <p className="text-sm text-slate-400 leading-relaxed px-2">Ingest IoT network traffic datasets (e.g., NSL-KDD format).</p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-lg relative group transition-transform hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Cpu className="w-10 h-10 text-indigo-400" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-slate-400 text-sm">2</div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Preprocess Data</h4>
                                <p className="text-sm text-slate-400 leading-relaxed px-2">Data is cleaned, encoded, and scaled for ML consumption.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-lg relative group transition-transform hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Brain className="w-10 h-10 text-indigo-400" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-slate-400 text-sm">3</div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Ensemble Scoring</h4>
                                <p className="text-sm text-slate-400 leading-relaxed px-2">Isolation Forest & Autoencoder score each packet for anomalies.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-lg relative group transition-transform hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <BarChart3 className="w-10 h-10 text-teal-400" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-slate-400 text-sm">4</div>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">Dashboard View</h4>
                                <p className="text-sm text-slate-400 leading-relaxed px-2">Interactive visualisations and real-time alerts appear on the dashboard.</p>
                            </div>

                            {/* Step 5 */}
                            <div className="flex flex-col items-center text-center lg:translate-y-0">
                                <div className="w-24 h-24 rounded-2xl bg-purple-900/40 border border-purple-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] relative group transition-transform hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-purple-900 border border-purple-500 flex items-center justify-center font-bold text-white text-sm">5</div>
                                </div>
                                <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 mb-2">AI Solution</h4>
                                <p className="text-sm text-slate-300 leading-relaxed px-1">
                                    Claude AI analyses the exact threat pattern and generates a step-by-step remediation plan specific to your network data.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNOLOGY SECTION */}
            <section className="py-24 bg-slate-900 relative">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h3 className="text-sm uppercase tracking-widest text-slate-500 font-bold mb-12">Built With</h3>

                    <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-4xl mx-auto">
                        {[
                            { name: 'Python', color: 'hover:border-yellow-500 hover:text-yellow-500' },
                            { name: 'scikit-learn', color: 'hover:border-amber-500 hover:text-amber-500' },
                            { name: 'TensorFlow', color: 'hover:border-orange-500 hover:text-orange-500' },
                            { name: 'FastAPI', color: 'hover:border-teal-500 hover:text-teal-500' },
                            { name: 'React', color: 'hover:border-cyan-400 hover:text-cyan-400' },
                            { name: 'Tailwind CSS', color: 'hover:border-sky-400 hover:text-sky-400' },
                            { name: 'Isolation Forest', color: 'hover:border-indigo-400 border-dashed hover:text-indigo-400 bg-slate-800/50' },
                            { name: 'LSTM Autoencoder', color: 'hover:border-indigo-400 border-dashed hover:text-indigo-400 bg-slate-800/50' },
                            { name: 'DBSCAN', color: 'hover:border-indigo-400 border-dashed hover:text-indigo-400 bg-slate-800/50' },
                            { name: 'Claude AI', color: 'border-purple-500/30 bg-purple-900/20 text-purple-300 hover:border-purple-400 hover:bg-purple-900/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]' }
                        ].map((tech) => (
                            <div
                                key={tech.name}
                                className={`px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/80 backdrop-blur-sm text-slate-300 font-medium transition-all duration-300 cursor-default ${tech.color}`}
                            >
                                {tech.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-950 border-t border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                        <div className="flex items-center gap-2 group">
                            <Shield className="w-6 h-6 text-teal-500" />
                            <span className="font-bold text-lg tracking-tight text-white">
                                IoT <span className="text-teal-400">ZeroGuard</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
                            <Link to="/about" className="hover:text-teal-400 transition-colors">About Project</Link>
                            <Link to="/dashboard" className="hover:text-teal-400 transition-colors">Detection Dashboard</Link>
                        </div>

                        <div className="text-sm text-slate-600 font-medium">
                            Academic Project Submission
                        </div>

                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Home;
