import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

const FirewallCodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 font-mono text-sm leading-relaxed">
            <div className="flex justify-between items-center bg-slate-900 border-b border-slate-800 px-4 py-2">
                <div className="flex items-center gap-2 text-slate-400">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="text-xs uppercase tracking-wider font-bold">Deployable Rules</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? (
                        <><Check className="w-3.5 h-3.5 text-green-400" /> Copied</>
                    ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                    )}
                </button>
            </div>
            <div className="p-4 overflow-x-auto text-slate-300">
                <pre className="whitespace-pre">
                    <code>
                        {code.split('\n').map((line, i) => (
                            <span key={i} className="block">
                                {line.startsWith('#') ? (
                                    <span className="text-slate-500 italic">{line}</span>
                                ) : line.includes('iptables') || line.includes('sysctl') ? (
                                    <span className="text-teal-400">{line}</span>
                                ) : (
                                    line
                                )}
                            </span>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default FirewallCodeBlock;
