def mitigate_threat(src_ip, threat_type):
    if threat_type == "suspicious":
        # Simulate blocking IP (e.g., iptables in Docker)
        return f"Blocked IP {src_ip} due to suspicious activity"
    return "No action taken"