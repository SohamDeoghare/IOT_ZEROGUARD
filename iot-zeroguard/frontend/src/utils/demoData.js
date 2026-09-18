export const getDemoAnalysisData = () => {
    return {
        filename: "demo_iot_traffic_capture.csv",
        timestamp: new Date().toLocaleTimeString(),
        metrics: {
            totalPackets: 125430,
            anomalies: 6271,
            normal: 119159,
            ensembleConfidence: 94.2,
            latencyMs: 42,
            ifScore: -0.15,
            aeScore: 0.88,
        },
        protocols: [
            { name: "TCP", normal: 65400, anomaly: 4100 },
            { name: "UDP", normal: 42100, anomaly: 1850 },
            { name: "ICMP", normal: 9500, anomaly: 280 },
            { name: "Other", normal: 2159, anomaly: 41 },
        ],
        timeseries: Array.from({ length: 50 }).map((_, i) => ({
            index: i * 2500,
            score: Math.max(0, Math.sin(i / 5) * 0.3 + 0.2 + (i > 30 && i < 35 ? Math.random() * 0.4 + 0.5 : Math.random() * 0.2)),
            threshold: 0.6
        })),
        features: [
            { name: "src_bytes", importance: 0.35 },
            { name: "dst_bytes", importance: 0.22 },
            { name: "duration", importance: 0.15 },
            { name: "count", importance: 0.12 },
            { name: "serror_rate", importance: 0.08 },
            { name: "wrong_fragment", importance: 0.05 },
            { name: "urgent", importance: 0.03 }
        ],
        scatter: Array.from({ length: 150 }).map((_, i) => {
            const isAnomaly = i > 120;
            return {
                x: isAnomaly ? 3 + Math.random() * 5 : Math.random() * 3,
                y: isAnomaly ? 4 + Math.random() * 4 : Math.random() * 3,
                type: isAnomaly ? 'Anomaly' : 'Normal',
                id: i
            };
        }),
        alerts: Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            timestamp: new Date(Date.now() - Math.random() * 1000000).toLocaleTimeString(),
            protocol: ['TCP', 'UDP', 'ICMP'][Math.floor(Math.random() * 3)],
            src_bytes: Math.floor(Math.random() * 50000),
            dst_bytes: Math.floor(Math.random() * 5000),
            duration: Math.floor(Math.random() * 100),
            ensemble_score: (0.6 + Math.random() * 0.38).toFixed(2),
            confidence: (85 + Math.random() * 14).toFixed(1),
            prediction: 'ANOMALY'
        })).sort((a, b) => b.ensemble_score - a.ensemble_score)
    };
};
