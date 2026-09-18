import { useState } from 'react';
import { getDemoAnalysisData } from '../utils/demoData';

export const useAnalysis = () => {
    const [file, setFile] = useState(null);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [error, setError] = useState(null);

    const simulateProgress = (onComplete) => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    onComplete();
                    return 100;
                }
                return p + Math.floor(Math.random() * 15) + 5;
            });
        }, 400);
    };

    const startDemo = () => {
        setIsDemoMode(true);
        setIsAnalysing(true);
        setError(null);
        simulateProgress(() => {
            setResults(getDemoAnalysisData());
            setIsAnalysing(false);
        });
    };

    const uploadFile = async (selectedFile) => {
        if (!selectedFile) return;
        setFile(selectedFile);
        setIsDemoMode(false);
        setIsAnalysing(true);
        setError(null);
        setProgress(10); // Start progress

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            setProgress(40); // Getting response

            const response = await fetch("http://localhost:8001/api/analyze", {
                method: "POST",
                body: formData,
            });

            setProgress(70); // Parsing response

            if (!response.ok) {
                throw new Error("Failed to analyze traffic file. Backend returned " + response.status);
            }

            const data = await response.json();

            setProgress(100);

            // Reformat response from real backend to match frontend expectatons
            setResults({
                filename: selectedFile.name,
                timestamp: new Date().toLocaleTimeString(),
                metrics: data.metrics,
                timeseries: data.timeseries,
                protocols: data.protocols || getDemoAnalysisData().protocols, // Fallback if backend doesn't provide
                features: data.features || getDemoAnalysisData().features,     // Fallback if backend doesn't provide
                scatter: data.scatter || getDemoAnalysisData().scatter,        // Fallback if backend doesn't provide
                alerts: data.alerts || getDemoAnalysisData().alerts            // Fallback if backend doesn't provide
            });

        } catch (err) {
            console.error("Backend request failed, falling back to demo mode locally", err);
            setError("Backend request failed: " + err.message + ". Showing demo instead.");
            // Fallback for presentation
            simulateProgress(() => {
                setResults({
                    ...getDemoAnalysisData(),
                    filename: selectedFile.name
                });
                setIsAnalysing(false);
            });
        } finally {
            setTimeout(() => setIsAnalysing(false), 500); // give progress bar time to complete visually
        }
    };

    const reset = () => {
        setFile(null);
        setResults(null);
        setProgress(0);
        setIsAnalysing(false);
        setIsDemoMode(false);
        setError(null);
    };

    return {
        file,
        isAnalysing,
        progress,
        results,
        isDemoMode,
        error,
        uploadFile,
        startDemo,
        reset
    };
};
