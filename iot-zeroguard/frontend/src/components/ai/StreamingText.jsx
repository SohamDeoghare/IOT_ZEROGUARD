import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import FirewallCodeBlock from './FirewallCodeBlock';
import { TerminalSquare, Sparkles } from 'lucide-react';

const StreamingText = ({ text }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [text]);

    const components = {
        h2: ({ node, ...props }) => (
            <h2 className="text-lg font-bold text-slate-200 mt-6 mb-3 flex items-center gap-2 border-b border-white/5 pb-2 w-max text-shadow-sm shadow-purple-900/50" {...props}>
                <div className="w-1 h-5 bg-purple-500 rounded-full shadow-[0_0_5px_#A855F7]"></div>
                {props.children}
            </h2>
        ),
        h3: ({ node, ...props }) => (
            <h3 className="text-md font-bold text-teal-400 mt-4 mb-2" {...props}>{props.children}</h3>
        ),
        p: ({ node, ...props }) => (
            <p className="text-sm text-slate-300 leading-relaxed mb-4" {...props} />
        ),
        ul: ({ node, ...props }) => (
            <ul className="list-disc text-sm text-slate-300 pl-5 mb-4 space-y-2 opacity-90 marker:text-purple-400" {...props} />
        ),
        ol: ({ node, ...props }) => (
            <ol className="list-decimal text-sm text-slate-300 pl-5 mb-4 space-y-2 opacity-90 marker:text-teal-400 font-medium" {...props} />
        ),
        li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
        ),
        code: ({ node, inline, ...props }) => {
            if (!inline && props.children) {
                return <FirewallCodeBlock code={String(props.children).replace(/\n$/, '')} />;
            }
            return <code className="bg-slate-900/80 text-teal-300 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-700 font-semibold" {...props} />;
        },
        strong: ({ node, ...props }) => {
            const isSeverity = String(props.children).match(/CRITICAL/i);
            const isHigh = String(props.children).match(/HIGH/i);
            if (isSeverity) return <strong className="text-red-400 font-extrabold" {...props} />;
            if (isHigh) return <strong className="text-orange-400 font-extrabold" {...props} />;
            return <strong className="text-white font-bold" {...props} />;
        }
    };

    return (
        <div
            ref={containerRef}
            className="ai-section p-6 rounded-lg max-h-[600px] overflow-y-auto w-full relative group transition-colors"
        >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50 pt-1">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest">
                    <TerminalSquare className="w-4 h-4 text-purple-400" />
                    <span>Claude AI Engine — Terminal Analysis</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-[10px] text-purple-400/80 font-bold uppercase tracking-widest">Streaming</span>
                </div>
            </div>

            <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 max-w-none">
                <ReactMarkdown components={components}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default StreamingText;
