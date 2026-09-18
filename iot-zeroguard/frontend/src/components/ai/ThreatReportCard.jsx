import React from 'react';
import ReactMarkdown from 'react-markdown';
import ThreatBadge from './ThreatBadge';
import FirewallCodeBlock from './FirewallCodeBlock';
import RiskScoreBar from './RiskScoreBar';
import { Share2, Download, Copy, Shield, AlertTriangle, ShieldCheck, Bug, Wrench, Lock, Code } from 'lucide-react';

const ThreatReportCard = ({ report, filename }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(report);
    };

    const getSectionIcon = (headerText) => {
        const text = headerText.toLowerCase();
        if (text.includes('classification')) return <Bug className="w-5 h-5 text-purple-400" />;
        if (text.includes('summary')) return <Shield className="w-5 h-5 text-teal-400" />;
        if (text.includes('root cause')) return <AlertTriangle className="w-5 h-5 text-red-400" />;
        if (text.includes('containment')) return <ShieldCheck className="w-5 h-5 text-amber-400" />;
        if (text.includes('remediation') || text.includes('hardening')) return <Wrench className="w-5 h-5 text-indigo-400" />;
        if (text.includes('firewall')) return <Code className="w-5 h-5 text-teal-400" />;
        if (text.includes('monitoring')) return <Lock className="w-5 h-5 text-cyan-400" />;
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    };

    const components = {
        h2: ({ node, ...props }) => {
            const headerText = String(props.children);
            return (
                <h2 className="text-lg font-bold text-white mt-8 mb-4 pt-4 border-t border-slate-700/50 flex items-center gap-2" {...props}>
                    {getSectionIcon(headerText)}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">{props.children}</span>
                </h2>
            );
        },
        h3: ({ node, ...props }) => <h3 className="text-md font-bold text-teal-400 mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => {
            const text = String(props.children);
            // Custom rendering for badges from exact text patterns
            if (text.startsWith('Type:')) {
                return <p className="mb-2"><span className="text-slate-400 mr-2">Type:</span><ThreatBadge type="HIGH" text={text.replace('Type:', '').trim()} /></p>;
            }
            if (text.startsWith('Severity:')) {
                const sevText = text.replace('Severity:', '').trim();
                return <p className="mb-2"><span className="text-slate-400 mr-2">Severity:</span><ThreatBadge type={sevText} /></p>;
            }
            if (text.startsWith('Confidence:')) {
                return <p className="mb-4"><span className="text-slate-400 mr-2">Confidence:</span><span className="font-mono text-white font-bold">{text.replace('Confidence:', '').trim()}</span></p>;
            }
            return <p className="text-sm text-slate-300 leading-relaxed mb-4" {...props} />;
        },
        ul: ({ node, ...props }) => <ul className="list-disc text-sm text-slate-300 pl-5 mb-4 space-y-2 opacity-90 marker:text-purple-400" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal text-sm text-slate-300 pl-5 mb-4 space-y-2 opacity-90 marker:text-teal-400 font-medium" {...props} />,
        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
        code: ({ node, inline, ...props }) => {
            if (!inline && props.children) {
                return <FirewallCodeBlock code={String(props.children).replace(/\n$/, '')} />;
            }
            return <code className="bg-slate-900 text-teal-300 px-1 py-0.5 rounded font-mono text-xs border border-slate-700" {...props} />;
        },
        strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />
    };

    // We explicitly render Risk bars at the end if the report includes risk score
    const renderRiskScore = () => {
        const beforeMatch = report.match(/Before:\s*([\d.]+)/);
        const afterMatch = report.match(/After:\s*([\d.]+)/);

        if (beforeMatch && afterMatch) {
            return <RiskScoreBar before={parseFloat(beforeMatch[1])} after={parseFloat(afterMatch[1])} />;
        }
        return null;
    };

    return (
        <div className="card w-full mb-8 bg-slate-800 border-purple-500/30 overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-slate-900/90 pointer-events-none"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border-b border-purple-500/20 px-6 py-4 relative z-10 gap-4">
                <div>
                    <h3 className="text-lg font-bold tracking-tight text-white mb-1">Generated Threat Intelligence Report</h3>
                    <p className="text-xs text-slate-400 font-mono">
                        Generated: {new Date().toLocaleString()} | Source: <span className="text-teal-400">{filename}</span> | Powered by Claude AI
                    </p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleCopy} className="p-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Report Body */}
            <div className="p-8 relative z-10 ai-section rounded-none border-none border-l-4 border-l-purple-500 bg-transparent">
                <div className="prose prose-invert max-w-none">
                    {/* We filter out the risk score text lines so we can render them as the visual component */}
                    <ReactMarkdown components={components}>
                        {report.replace(/## RISK SCORE AFTER REMEDIATION[\s\S]*?(?=(##|$))/i, '')}
                    </ReactMarkdown>
                </div>

                {renderRiskScore()}
            </div>
        </div>
    );
};

export default ThreatReportCard;
