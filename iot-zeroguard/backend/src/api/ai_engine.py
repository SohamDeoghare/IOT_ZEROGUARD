import anthropic
import json
import os
from typing import AsyncGenerator
import asyncio

class ThreatAnalysisEngine:
    def __init__(self):
        # Allow running in demo mode if no key is present
        self.api_key = os.getenv("ANTHROPIC_API_KEY", "")
        self.demo_mode = os.getenv("DEMO_MODE", "true").lower() == "true" or not self.api_key
        if not self.demo_mode:
            self.client = anthropic.AsyncAnthropic(api_key=self.api_key)
        else:
            self.client = None
            print("WARNING: Running AI Engine in DEMO MODE (no API key configured or DEMO_MODE=true)")

    def build_threat_prompt(self, analysis_data: dict) -> str:
        # Destructure data safely
        metrics = analysis_data.get('metrics', {})
        totals = metrics.get('totalPackets', 0)
        anomalies = metrics.get('anomalies', 0)
        rate = ((anomalies / totals) * 100) if totals > 0 else 0
        normal = metrics.get('normal', 0)
        normal_rate = ((normal / totals) * 100) if totals > 0 else 0
        
        avg_score = metrics.get('ensembleConfidence', 0)
        confidence = metrics.get('ensembleConfidence', 0)
        
        protocols = analysis_data.get('protocols', [])
        protocol_breakdown = "\\n".join([f"- {p['name']}: {p['anomaly']} anomalies / {p['normal']} normal" for p in protocols])
        
        features = analysis_data.get('features', [])
        feature_importance_list = "\\n".join([f"- {f['name']} (importance: {f['importance']})" for f in features[:5]])
        
        alerts = analysis_data.get('alerts', [])
        top_anomaly_samples = "\\n".join([
            f"ID {a['id']}: proto={a['protocol']}, src={a['src_bytes']}, dst={a['dst_bytes']}, dur={a['duration']}ms, score={a['ensemble_score']}" 
            for a in alerts[:5]
        ])

        if_avg = metrics.get('ifScore', 0)
        ae_avg = metrics.get('aeScore', 0)

        prompt = f"""
You are a senior cybersecurity analyst and IoT security expert. Analyse the following network anomaly detection results from an AI-powered IDS system and provide a comprehensive threat intelligence report with definitive, actionable remediation solutions.

DETECTION RESULTS:
- Total packets analysed: {totals}
- Anomalies detected: {anomalies} ({rate:.2f}% of traffic)
- Normal traffic: {normal} ({normal_rate:.2f}%)
- Average ensemble anomaly score: {avg_score}
- Detection confidence: {confidence}%

ANOMALY BREAKDOWN BY PROTOCOL:
{protocol_breakdown}

TOP TRIGGERED FEATURES (highest anomaly contribution):
{feature_importance_list}

TOP 5 HIGHEST SEVERITY ANOMALY SAMPLES:
{top_anomaly_samples}

MODEL SCORES:
- Isolation Forest: avg={if_avg}, threshold=-0.1
- Autoencoder MSE: avg={ae_avg}, threshold=0.05
- Ensemble decision_threshold=0.6

NETWORK ENVIRONMENT: IoT network (smart home / industrial IoT / healthcare IoT)

Provide a DEFINITIVE threat intelligence report with:
1. Exact threat classification (DoS/DDoS/Probe/R2L/U2R/Botnet/MITM/other) with confidence percentage
2. Severity rating (LOW/MEDIUM/HIGH/CRITICAL) with justification based on the actual numbers above
3. Executive summary (3 sentences, non-technical)
4. Root cause analysis — explain exactly which features indicate this threat and why
5. Immediate containment steps (0-1 hour) — numbered, specific, with actual Linux/iptables commands where applicable
6. Short-term remediation (1-24 hours) — firewall rules, network segmentation, IoT device isolation
7. Long-term hardening (1-7 days) — architecture changes, monitoring rules, patch recommendations
8. Ready-to-deploy firewall rules as code block (iptables)
9. Monitoring strategy — exact thresholds and alert conditions to configure
10. Risk score before and after remediation (X/10 scale)

Be specific and definitive. Use actual values from the detection results. Do not be generic. Every recommendation must reference the actual anomaly data provided. Format each section clearly with headers (##). For code blocks use proper markdown code fencing.
"""
        return prompt

    def build_single_threat_prompt(self, packet_data: dict) -> str:
        prompt = f"""
You are a senior cybersecurity analyst. Analyse this specific network flow that was flagged as anomalous by an AI detection system:

FLAGGED NETWORK FLOW:
- Protocol: {packet_data.get('protocol')}
- Source bytes: {packet_data.get('src_bytes')}
- Destination bytes: {packet_data.get('dst_bytes')}
- Duration: {packet_data.get('duration')}ms

ML SCORES:
- Ensemble score: {packet_data.get('ensemble_score')} (threshold: 0.6)
- Prediction: {packet_data.get('prediction')} (confidence: {packet_data.get('confidence')}%)

Provide:
1. Exact attack type classification
2. Severity (CRITICAL/HIGH/MEDIUM/LOW)
3. Why these specific feature values indicate an attack
4. Exact immediate action for THIS specific flow
5. Specific firewall rule to block this pattern
6. Whether this is likely part of a larger attack campaign

Format response in clear sections with headers. Be definitive — this is a production security system.
"""
        return prompt

    async def stream_analysis(self, prompt: str) -> AsyncGenerator[str, None]:
        if self.demo_mode:
            # Yield pre-written content in chunks if in demo mode
            demo_text = self.generate_demo_report()
            words = demo_text.split(" ")
            for i in range(0, len(words), 3):
                chunk = " ".join(words[i:i+3]) + " "
                yield chunk
                await asyncio.sleep(0.1)
            return

        # Real Anthropic Streaming implementation
        try:
            async with self.client.messages.stream(
                model="claude-3-5-sonnet-20241022",
                max_tokens=2000,
                messages=[{"role": "user", "content": prompt}]
            ) as stream:
                async for text in stream.text_stream:
                    yield text
        except Exception as e:
            yield f"\\n\\nError communicating with Claude AI: {str(e)}"

    def generate_demo_report(self) -> str:
        return """
## THREAT CLASSIFICATION
**Type:** SYN Flood DDoS + Port Scan Payload
**Severity:** CRITICAL
**Confidence:** 94.2%

## EXECUTIVE SUMMARY
The ensemble ML detection engine has identified a severe, multi-vector attack targeting the core IoT messaging broker (port 1883) and gateway HTTPS. The anomaly score is driven by exceptionally high connection rates without corresponding data transfer. Immediate containment is required to prevent denial of service for legitimate IoT device metrics.

## ROOT CAUSE ANALYSIS
The model flagged this sequence due to primary deviations from baseline normal IoT behavior:
1. `src_bytes` reached abnormal high values across packets in <50ms (Normal baseline: <1,200 bytes/sec).
2. The score metric spiked, indicating incoming connections are not completing the TCP handshake.
3. The Autoencoder reconstruction error indicates the temporal sequence contradicts the learned normal periodic IoT check-in behavior.

## IMMEDIATE CONTAINMENT (0-1 hour)
Immediate blockage of the offending subnet is required to restore MQTT broker availability.

1. **Null-route the attacker subnet at the edge router** to drop traffic before it hits the application layer.
2. **Implement rate limiting** on the MQTT broker and HTTPS endpoints.
3. **Drop lingering half-open TCP connections** to free up server connection tables.

## SHORT-TERM REMEDIATION (1-24 hours)
- Segment the critical IoT management interfaces onto a separate VLAN accessible only via authenticated VPN.
- Enable SYN cookies on the Linux kernel networking stack to mitigate future TCP SYN floods.
- Throttle unauthenticated connections to 10/second per IP.

## LONG-TERM HARDENING (1-7 days)
- Deploy an active Web Application Firewall (WAF) to inspect payload headers.
- Update the device firmware to utilize mutual TLS (mTLS) for all broker communication.

## FIREWALL RULES
```bash
# 1. Block the direct source of the attack
iptables -A INPUT -s 192.168.100.0/24 -j DROP 
iptables -A FORWARD -s 192.168.100.0/24 -j DROP

# 2. Limit new TCP connections to mitigate storms
iptables -A INPUT -p tcp --syn -m limit --limit 20/s --limit-burst 50 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# 3. Enable SYN cookies in kernel
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -p
```

## MONITORING STRATEGY
Ensure the dashboard is monitored specifically for the metric returning to baseline. Set up push alerts if legitimate devices are being starved of resources.

## RISK SCORE AFTER REMEDIATION
Before: 9.1
After: 2.3
"""
