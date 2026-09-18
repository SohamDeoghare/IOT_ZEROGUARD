import React, { useRef, useState } from 'react';
import { useAnalysis } from '../hooks/useAnalysis';
import UploadZone from '../components/UploadZone';
import MetricCard from '../components/MetricCard';
import AnomalyTimeseries from '../components/AnomalyTimeseries';
import TrafficDonut from '../components/TrafficDonut';
import ProtocolBars from '../components/ProtocolBars';
import ModelComparison from '../components/ModelComparison';
import FeatureImportance from '../components/FeatureImportance';
import ScatterPlot from '../components/ScatterPlot';
import AlertsTable from '../components/AlertsTable';
import SummaryReport from '../components/SummaryReport';
import ThreatEnginePanel from '../components/ai/ThreatEnginePanel';
import SingleThreatModal from '../components/ai/SingleThreatModal';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import { Database, AlertTriangle, ShieldCheck, Activity, RefreshCw, Download, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
    const { file, isAnalysing, progress, results, isDemoMode, uploadFile, startDemo, reset } = useAnalysis();
    const [selectedThreat, setSelectedThreat] = useState(null);

    // Custom hook for single row AI modal
    const {
        status: aiStatus,
        reportParts: aiReport,
        startAnalysis: startAiAnalysis,
        resetAnalysis: resetAiAnalysis
    } = useAIAnalysis();

    const aiSectionRef = useRef(null);

    const dashboardRef = useRef(null);

    const handleScrollToAI = () => {
        if (aiSectionRef.current) {
            aiSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    const handleGeneratePdf = async () => {
        const element = dashboardRef.current;
        if (!element) return;

        try {
            // Setup pdf
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

            // Capture canvas
            const canvas = await html2canvas(element, {
                scale: 1.5, // slightly higher res
                backgroundColor: '#0F172A', // slate-950
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`IoT-ZeroGuard-Report-${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error("Error generating PDF", error);
        }
    };

    const handleAnalyseSpecificThreat = (alertData) => {
        setSelectedThreat(alertData);
        startAiAnalysis(true, alertData); // Trigger AI for single threat
    };

    const handleCloseModal = () => {
        setSelectedThreat(null);
        resetAiAnalysis();
    };

    if (isAnalysing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] space-y-8 max-w-xl mx-auto w-full px-4">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-teal-500 animate-spin"></div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400 text-center">
                    Analysing Network Traffic... {progress}%
                </h2>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                    <div
                        className="bg-teal-500 h-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-slate-400 font-mono text-sm">
                    {progress < 30 && "Parsing CSV file format..."}
                    {progress >= 30 && progress < 60 && "Extracting features & scaling..."}
                    {progress >= 60 && progress < 85 && "Running Inference (IF, LSTM, DBSCAN)..."}
                    {progress >= 85 && "Consolidating ensemble scores..."}
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <UploadZone onUpload={uploadFile} onDemo={startDemo} />
            </div>
        );
    }

    // Calculate trends for metric cards
    const anomalyPercentage = ((results.metrics.anomalies / results.metrics.totalPackets) * 100).toFixed(1);
    const normalPercentage = ((results.metrics.normal / results.metrics.totalPackets) * 100).toFixed(1);
    const isHighAnomaly = anomalyPercentage > 5;

    return (
        <div className="w-full bg-slate-900 pb-20 pt-6" ref={dashboardRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* DASHBOARD HEADER */}
                <div className="flex flex-col flex-wrap md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Analysis Results</h1>
                            {isDemoMode && (
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 text-xs font-bold border border-amber-500/30">DEMO MODE</span>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 font-mono mt-1">
                            File: <span className="text-teal-400">{results.filename}</span> • Computed: {results.timestamp}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <button onClick={reset} className="btn-outline text-sm px-4 py-2 w-full sm:w-auto hover:bg-slate-700">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Re-upload
                        </button>
                        <button onClick={handleGeneratePdf} className="btn-primary text-sm px-4 py-2 w-full sm:w-auto">
                            <Download className="w-4 h-4 mr-2" />
                            Export Full Report
                        </button>
                        <button onClick={handleScrollToAI} className="btn-ai text-sm px-4 py-2 w-full sm:w-auto">
                            <Sparkles className="w-4 h-4" />
                            Get AI Analysis
                        </button>
                    </div>
                </div>

                {/* ROW 1: PRIMARY METRICS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        title="Total Packets Analysed"
                        value={results.metrics.totalPackets}
                        icon={Database}
                        color="teal"
                        trend="New Capture"
                        trendDirection="neutral"
                    />
                    <MetricCard
                        title="Anomalies Detected"
                        value={results.metrics.anomalies}
                        icon={AlertTriangle}
                        isRed={true}
                        trend={`${anomalyPercentage}% of total`}
                        trendDirection="up"
                    />
                    <MetricCard
                        title="Normal Traffic"
                        value={results.metrics.normal}
                        icon={ShieldCheck}
                        isGreen={true}
                        trend={`${normalPercentage}% clean`}
                        trendDirection="neutral"
                    />
                    <MetricCard
                        title="Ensemble Confidence Score"
                        value={results.metrics.ensembleConfidence}
                        suffix="%"
                        icon={Activity}
                        color="indigo"
                        trend="Model Agreement"
                        trendDirection="neutral"
                    />
                </div>

                {/* ROW 2: MODEL SCORES (Smaller cards) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card py-4 bg-slate-800/50 flex justify-between items-center border-l-4 border-l-indigo-500">
                        <div>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Isolation Forest Score</p>
                            <p className="text-xl font-bold font-mono text-indigo-400">{results.metrics.ifScore.toFixed(3)}</p>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">Avg Threshold: -0.1</p>
                    </div>
                    <div className="card py-4 bg-slate-800/50 flex justify-between items-center border-l-4 border-l-purple-500">
                        <div>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Autoencoder Recon Error</p>
                            <p className="text-xl font-bold font-mono text-purple-400">{results.metrics.aeScore.toFixed(3)}</p>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">MSE Threshold: 0.6</p>
                    </div>
                    <div className="card py-4 bg-slate-800/50 flex justify-between items-center border-l-4 border-l-teal-500">
                        <div>
                            <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Detection Latency</p>
                            <p className="text-xl font-bold font-mono text-teal-400">{results.metrics.latencyMs}ms</p>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">Ultra-low impact</p>
                    </div>
                </div>

                {/* ROW 3: MAIN CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <AnomalyTimeseries data={results.timeseries} />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-4">
                        <TrafficDonut metrics={results.metrics} />
                    </div>
                </div>

                {/* ROW 4: PROTOCOLS & MODEL COMPARISON */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ProtocolBars data={results.protocols} />
                    <ModelComparison data={results.timeseries} />
                </div>

                {/* ROW 5: FEATURE & SCATTER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5">
                        <FeatureImportance data={results.features} />
                    </div>
                    <div className="lg:col-span-7">
                        <ScatterPlot data={results.scatter} />
                    </div>
                </div>

                {/* ROW 6: ALERTS TABLE */}
                <div className="w-full">
                    <AlertsTable alerts={results.alerts} onAnalyseThreat={handleAnalyseSpecificThreat} />
                </div>

                {/* ROW 7: SUMMARY REPORT */}
                <div className="w-full">
                    <SummaryReport metrics={results.metrics} fileDetails={{ filename: results.filename }} />
                </div>

                {/* ROW 8: AI THREAT ENGINE */}
                <div ref={aiSectionRef} className="w-full mt-12 pt-12 border-t border-slate-800/50">
                    <ThreatEnginePanel metrics={results.metrics} filename={results.filename} />
                </div>

            </div>

            {/* SINGLE THREAT MODAL (Row level) */}
            <SingleThreatModal
                isOpen={!!selectedThreat}
                onClose={handleCloseModal}
                data={selectedThreat || {}}
                aiStatus={aiStatus}
                aiReport={aiReport}
            />
        </div>
    );
};

export default Dashboard;
