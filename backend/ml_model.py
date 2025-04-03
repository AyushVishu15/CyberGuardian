from scapy.all import IP

def detect_threat(packet):
    # Dummy ML logic (replace with trained model)
    if IP in packet:
        src_ip = packet[IP].src
        if src_ip.startswith('192.168'):  # Example rule
            return "normal"
        return "suspicious"  # Simulate anomaly
    return "unknown"