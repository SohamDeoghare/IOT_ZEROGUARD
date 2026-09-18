import React from 'react';
import { ShieldAlert, Activity, ShieldCheck, Zap, Server, Code, Layers, Sparkles, TerminalSquare, BookOpen, GraduationCap, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, icon: Icon, color = "teal" }) => {
    const colorMap = {
        teal: "text-teal-400 border-teal-500/30 bg-teal-500/10",
        indigo: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
        purple: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    };

    return (
        <div className="flex items-center gap-3 mb-8">
            <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
        </div>
    );
};

const About = () => {
    return (
        <div className="w-full bg-slate-900 pb-24">

            {/* HERO SECTION */}
            <section className="relative pt-24 pb-16 px-4 border-t-4 border-teal-500 overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[100px] pointer-events-none rounded-full"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold mb-6"
                    >
                        About This Project
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        An academic research and implementation project focused on building an <strong>AI-Driven Zero-Day Attack Detection</strong> system for IoT Networks, combining unsupervised machine learning ensembles with generative AI threat remediation.
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                {/* SECTION 1 - THE PROBLEM */}
                <section>
                    <SectionHeader title="The Problem" icon={ShieldAlert} />
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card hover:border-teal-500/50 transition-colors">
                            <ShieldAlert className="w-8 h-8 text-red-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Zero-Day Vulnerability</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Traditional signature-based IDS solutions fail against novel zero-day attacks because there are no known signatures. IoT devices are uniquely vulnerable due to limited patching capabilities and varied OS structures.
                            </p>
                        </div>
                        <div className="card hover:border-teal-500/50 transition-colors">
                            <Activity className="w-8 h-8 text-amber-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Real-Time Traffic Challenges</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                IoT networks generate massive volumes of diverse protocol traffic (MQTT, CoAP, HTTP). Distinguishing noise from actual sophisticated attack patterns in real time requires robust, lightweight analysis.
                            </p>
                        </div>
                        <div className="card hover:border-teal-500/50 transition-colors">
                            <ShieldCheck className="w-8 h-8 text-teal-400 mb-4" />
                            <h3 className="text-xl font-bold mb-3">Need for Proactive Security</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Detecting an attack is only half the battle. Security operators face "alert fatigue" and need immediate, context-aware remediation strategies to contain threats before significant lateral movement occurs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2 - OBJECTIVES (TIMELINE) */}
                <section>
                    <SectionHeader title="Project Objectives" icon={Zap} color="indigo" />
                    <div className="relative border-l border-slate-700 ml-4 md:ml-6 space-y-8">

                        <div className="relative pl-8">
                            <div className="absolute w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-400 -left-[8px] top-1"></div>
                            <h3 className="text-lg font-bold text-white mb-2">1. Develop Anomaly Detection Model</h3>
                            <p className="text-slate-400 text-sm">Build a high-performance feature extraction pipeline parsing core PCAP/csv network flow data tailored for IoT protocol communication constraints.</p>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-400 -left-[8px] top-1"></div>
                            <h3 className="text-lg font-bold text-white mb-2">2. Leverage Unsupervised Learning</h3>
                            <p className="text-slate-400 text-sm">Train models continuously on baseline "normal" behavior instead of known malicious behavior, allowing the system to flag statistical deviations indicative of zero-day attacks.</p>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-400 -left-[8px] top-1"></div>
                            <h3 className="text-lg font-bold text-white mb-2">3. Minimise False Positives</h3>
                            <p className="text-slate-400 text-sm">Implement an ensemble voting model across structural (Isolation Forest), sequential (LSTM Autoencoder), and density-based (DBSCAN) algorithms to drastically reduce false alarm rates.</p>
                        </div>

                        <div className="relative pl-8">
                            <div className="absolute w-4 h-4 rounded-full bg-purple-900 border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] -left-[8px] top-1 z-10"></div>
                            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-500 mb-2">4. AI-Powered Threat Remediation</h3>
                            <p className="text-slate-300 text-sm font-medium border-l-2 border-purple-500/50 pl-3 py-1">
                                Upon detecting a threat, Claude AI analyses the attack pattern, classifies the threat type, and generates a precise remediation plan with concrete steps, firewall rules, and preventive measures tailored to the detected anomaly.
                            </p>
                        </div>

                    </div>
                </section>

                {/* SECTION 3 - TECHNICAL METHODOLOGY */}
                <section>
                    <SectionHeader title="Technical Methodology" icon={Server} color="teal" />
                    <div className="card mb-6">
                        <h3 className="text-sm tracking-widest text-slate-400 uppercase font-bold mb-6">Detection Pipeline</h3>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full opacity-80">

                            <div className="flex-1 w-full text-center border border-slate-700 bg-slate-900 p-4 rounded-lg">
                                <span className="text-xs font-mono text-teal-400 block mb-1">Input</span>
                                <span className="font-bold text-sm">Raw Traffic CSV</span>
                            </div>

                            <div className="text-slate-500 rotate-90 md:rotate-0">→</div>

                            <div className="flex-1 w-full text-center border border-slate-700 bg-slate-900 p-4 rounded-lg">
                                <span className="text-xs font-mono text-indigo-400 block mb-1">Preprocess</span>
                                <span className="font-bold text-sm">Scale & Encode</span>
                            </div>

                            <div className="text-slate-500 rotate-90 md:rotate-0">→</div>

                            <div className="flex-[1.5] w-full text-center border border-slate-700 bg-slate-900 p-4 rounded-lg">
                                <span className="text-xs font-mono text-teal-400 block mb-1">Ensemble Inference</span>
                                <span className="font-bold text-sm">IF + LSTM + DBSCAN</span>
                            </div>

                            <div className="text-slate-500 rotate-90 md:rotate-0">→</div>

                            <div className="flex-1 w-full text-center border border-purple-500/50 bg-purple-900/10 p-4 rounded-lg">
                                <span className="text-xs font-mono text-purple-400 block mb-1">Claude API</span>
                                <span className="font-bold text-sm">AI Remediation</span>
                            </div>

                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card">
                            <h3 className="text-sm font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Hardware Specs</h3>
                            <ul className="text-sm text-slate-400 space-y-2 font-mono">
                                <li>• Process: NVIDIA T4 / A100 (for LSTM)</li>
                                <li>• Memory: 16GB RAM minimum</li>
                                <li>• Network: Promiscuous mode enabled NIC</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3 className="text-sm font-bold text-slate-300 mb-4 border-b border-slate-700 pb-2">Software Stack</h3>
                            <ul className="text-sm text-slate-400 space-y-2 font-mono">
                                <li>• React + TailwindCSS (Vite)</li>
                                <li>• FastAPI + Python 3.10</li>
                                <li>• TensorFlow / Keras / Scikit-learn</li>
                                <li>• Anthropic Claude API</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 4 - ML MODELS EXPLAINED */}
                <section>
                    <SectionHeader title="Machine Learning Models" icon={Code} color="indigo" />
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="card border-t-4 border-t-indigo-500">
                            <h3 className="text-lg font-bold mb-2">Isolation Forest</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                An explicit isolation-based anomaly detection algorithm. Instead of profiling normal data points, it explicitly isolates anomalous points. Highly efficient for high-dimensional tabular network data and fast to evaluate during live captures.
                            </p>
                        </div>
                        <div className="card border-t-4 border-t-teal-500">
                            <h3 className="text-lg font-bold mb-2">LSTM Autoencoder</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                A deep learning architecture designed to handle sequential time-series data. It learns to compress and reconstruct normal packet sequences. A high Mean Squared Error (MSE) during reconstruction indicates sequence-based temporal anomalies.
                            </p>
                        </div>
                        <div className="card border-t-4 border-t-indigo-500">
                            <h3 className="text-lg font-bold mb-2">DBSCAN</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Density-Based Spatial Clustering of Applications with Noise. Groups together closely packed points while marking points in low-density regions as outliers. Extremely effective for discovering novel attack clusters without prior labels.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 5 - AI THREAT ENGINE (NEW) */}
                <section>
                    <div className="card !p-0 border-purple-500/30 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-slate-900/50 pointer-events-none"></div>

                        <div className="p-8 border-b border-purple-500/20">
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                                <h2 className="text-3xl font-extrabold text-white">AI-Powered Threat Intelligence Engine</h2>
                            </div>
                            <p className="text-purple-300/80 font-medium tracking-wide">Powered by Claude AI</p>
                        </div>

                        <div className="grid lg:grid-cols-2">
                            {/* Left Column - How it works */}
                            <div className="p-8 border-r border-slate-700/50 bg-slate-900/40 relative z-10">
                                <h3 className="text-xl font-bold mb-6 text-white border-b border-slate-700/50 pb-2 inline-block">Analysis Workflow</h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">1</div>
                                        <div>
                                            <h4 className="font-bold text-slate-200">Threat Data Extraction</h4>
                                            <p className="text-sm text-slate-400 mt-1">Extracts structural payload data from ensemble results including protocol, confidence score, exact feature anomalies (e.g. `src_bytes`), and traffic sequence metadata.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">2</div>
                                        <div>
                                            <h4 className="font-bold text-slate-200">Contextual Prompt Construction</h4>
                                            <p className="text-sm text-slate-400 mt-1">A highly structured, deterministically scoped prompt is built containing extreme technical detail formatted specifically for the Claude Sonnet model.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-200">Intelligent Pattern Analysis</h4>
                                            <p className="text-sm text-slate-400 mt-1">Claude analyses the raw metrics, cross-references with known cyber-attack vectors, and classifies the zero-day threat into a known category (e.g., DoS, R2L).</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">4</div>
                                        <div>
                                            <h4 className="font-bold text-slate-200">Report & Remediation Generation</h4>
                                            <p className="text-sm text-slate-400 mt-1">Generates a definitive remediation report containing a root cause analysis, immediate containment actions, deployable `iptables` firewall rules, and long-term hardening setup.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Sample Output Preview */}
                            <div className="p-8 bg-[#0F172A] relative flex justify-center items-center">
                                <div className="absolute inset-0 bg-slate-900/80 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

                                <div className="w-full max-w-sm border border-slate-700 bg-[#1E293B] rounded-lg shadow-2xl relative z-10 ai-section">
                                    <div className="bg-[#0F172A] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TerminalSquare className="w-4 h-4 text-purple-400" />
                                            <span className="text-xs font-mono text-slate-300">Claude_Analysis_Preview</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-4 font-mono text-xs">
                                        <div className="flex justify-between items-center text-slate-400 mb-2">
                                            <span>THREAT INTELLIGENCE REPORT</span>
                                            <span>v2.4</span>
                                        </div>

                                        <div className="bg-slate-900 p-2 rounded border border-slate-700">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <span className="text-slate-500 block">Classification</span>
                                                    <span className="text-purple-400 font-bold">SYN Flood (DoS)</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Severity</span>
                                                    <span className="text-red-400 font-bold">CRITICAL</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Confidence</span>
                                                    <span className="text-white font-bold">94.2%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <strong className="text-teal-400 block mb-1">Root Cause Analysis:</strong>
                                            <p className="text-slate-300 leading-relaxed text-opacity-80">Abnormal spike in `src_bytes` against target port 443 with matching partial signatures indicative of heavy single-source packet load. High LSTM MSE (1.42) shows strict sequence deviation.</p>
                                        </div>

                                        <div>
                                            <strong className="text-amber-400 block mb-1">Immediate Actions:</strong>
                                            <ol className="text-slate-300 text-opacity-80 list-decimal pl-4 space-y-1">
                                                <li>Block source IP subnet instantly.</li>
                                                <li>Engage rate-limits on gateway port 443.</li>
                                            </ol>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6 - ACADEMIC INTEGRATION */}
                <section>
                    <SectionHeader title="Academic Context" icon={BookOpen} color="teal" />
                    <div className="overflow-x-auto rounded-xl border border-slate-700">
                        <table className="w-full text-left bg-slate-800 text-sm">
                            <thead className="bg-slate-900 text-slate-300 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Course / Domain</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Concept Used</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Application in Project</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                <tr className="hover:bg-slate-800/80 transition-colors">
                                    <td className="px-6 py-4 text-slate-200 font-medium">Information Security</td>
                                    <td className="px-6 py-4 text-slate-400">Intrusion Detection, Firewalls</td>
                                    <td className="px-6 py-4 text-slate-400">Core architecture of system handling raw network packets and blocking via AI-generated rules.</td>
                                </tr>
                                <tr className="hover:bg-slate-800/80 transition-colors">
                                    <td className="px-6 py-4 text-slate-200 font-medium">Machine Learning</td>
                                    <td className="px-6 py-4 text-slate-400">Unsupervised Ensembles, Outlier Detection</td>
                                    <td className="px-6 py-4 text-slate-400">Training IF and DBSCAN on continuous network sets without requiring exact malicious labels.</td>
                                </tr>
                                <tr className="hover:bg-slate-800/80 transition-colors">
                                    <td className="px-6 py-4 text-slate-200 font-medium">Deep Learning</td>
                                    <td className="px-6 py-4 text-slate-400">Sequence Models (RNN/LSTM)</td>
                                    <td className="px-6 py-4 text-slate-400">Using Autoencoders to reconstruct temporal packet sequences over fixed time windows.</td>
                                </tr>
                                <tr className="hover:bg-slate-800/80 transition-colors bg-purple-500/5">
                                    <td className="px-6 py-4 text-slate-200 font-medium border-l-2 border-purple-500">LLM & GenAI</td>
                                    <td className="px-6 py-4 text-slate-400">Automated Remediation, Prompt Engineering</td>
                                    <td className="px-6 py-4 text-slate-400">Formulating zero-day payload data to prompt Claude API for immediate containment strategies.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* SECTION 7 - TEAM */}
                <section>
                    <SectionHeader title="Project Team" icon={Users} color="indigo" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Template Card - Duplicate or map if more members */}
                        <div className="card flex items-start gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors border border-slate-600 group-hover:border-indigo-500/50">
                                <GraduationCap className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Sharva Salgarkar</h3>
                                <p className="text-xs font-mono text-teal-400 mb-2">Lead Developer</p>
                                <p className="text-sm text-slate-400">Symbiosis Skills and Professional University</p>
                                <p className="text-xs text-slate-500 mt-1">CSIT(Cybersecurity)</p>
                            </div>
                        </div>

                        <div className="card flex items-start gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors border border-slate-600 group-hover:border-indigo-500/50">
                                <GraduationCap className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Shreeya Kale</h3>
                                <p className="text-xs font-mono text-teal-400 mb-2">System Designer</p>
                                <p className="text-sm text-slate-400">Symbiosis Skills and Professional University</p>
                                <p className="text-xs text-slate-500 mt-1">CSIT(Cybersecurity)</p>
                            </div>
                        </div>

                        <div className="card flex items-start gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors border border-slate-600 group-hover:border-indigo-500/50">
                                <GraduationCap className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Som Bhagat</h3>
                                <p className="text-xs font-mono text-teal-400 mb-2">AI-ML Specialist</p>
                                <p className="text-sm text-slate-400">Symbiosis Skills and Professional University</p>
                                <p className="text-xs text-slate-500 mt-1">CSIT(Cybersecurity)</p>
                            </div>
                        </div>

                        <div className="card flex items-start gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors border border-slate-600 group-hover:border-indigo-500/50">
                                <GraduationCap className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Manas Sharma</h3>
                                <p className="text-xs font-mono text-teal-400 mb-2">Iot Specialist</p>
                                <p className="text-sm text-slate-400">Symbiosis Skills and Professional University</p>
                                <p className="text-xs text-slate-500 mt-1">CSIT(Cybersecurity)</p>
                            </div>
                        </div>

                        <div className="card flex items-start gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors border border-slate-600 group-hover:border-indigo-500/50">
                                <GraduationCap className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Hrushika Pendharkar</h3>
                                <p className="text-xs font-mono text-teal-400 mb-2">Cybersecurity Specialist</p>
                                <p className="text-sm text-slate-400">Symbiosis Skills and Professional University</p>
                                <p className="text-xs text-slate-500 mt-1">CSIT(Cybersecurity)</p>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};

export default About;
