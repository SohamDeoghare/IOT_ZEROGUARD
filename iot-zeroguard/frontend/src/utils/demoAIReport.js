export const getDemoAIReportChunked = () => {
    const fullText = `
## THREAT CLASSIFICATION
**Type:** SYN Flood DDoS + Port Scan Payload
**Severity:** CRITICAL
**Confidence:** 94.2%

## EXECUTIVE SUMMARY
The ensemble ML detection engine has identified a severe, multi-vector attack originating from external subnet 192.168.100.0/24 targeting the core IoT messaging broker (port 1883) and gateway HTTPS. The anomaly score of 0.98 is driven by exceptionally high connection rates without corresponding data transfer (source bytes vs destination bytes asymmetry). Immediate containment is required to prevent denial of service for legitimate IoT device metrics.

## ROOT CAUSE ANALYSIS
The model flagged this sequence due to three primary deviations from baseline normal IoT behavior:
1. \`src_bytes\` reached 45,000 across 2,000+ packets in <50ms (Normal baseline: <1,200 bytes/sec).
2. \`serror_rate\` (SYN error rate) spiked to 0.95, indicating incoming connections are not completing the TCP handshake.
3. The Autoencoder reconstruction error (MSE) peaked at 0.88, indicating the temporal sequence of these connections completely contradicts the learned normal periodic IoT check-in behavior.

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
- Define explicit baseline thresholds in the IDS for \`serror_rate\` alerts > 0.4.

## FIREWALL RULES
\`\`\`bash
# 1. Block the direct source of the attack
iptables -A INPUT -s 192.168.100.0/24 -j DROP 
iptables -A FORWARD -s 192.168.100.0/24 -j DROP

# 2. Limit new TCP connections to mitigate SYN storms
iptables -A INPUT -p tcp --syn -m limit --limit 20/s --limit-burst 50 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# 3. Enable SYN cookies in kernel
sysctl -w net.ipv4.tcp_syncookies=1
sysctl -p
\`\`\`

## MONITORING STRATEGY
Ensure the dashboard is monitored specifically for the \`serror_rate\` metric dropping back below 0.1 over the next 15 minutes. Set up push alerts if \`dst_host_srv_count\` falls below 10, indicating legitimate devices are being starved of resources.

## RISK SCORE AFTER REMEDIATION
Before: 9.1
After: 2.3
`;
    return fullText;
};
