from scapy.all import sniff, IP
import sqlite3
from ml_model import detect_threat
from datetime import datetime

def log_packet(packet):
    if IP in packet:
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        threat = detect_threat(packet)  # ML detection
        conn = sqlite3.connect('data/traffic_logs.db')
        c = conn.cursor()
        c.execute('INSERT INTO logs (src_ip, dst_ip, threat, timestamp) VALUES (?, ?, ?, ?)',
                  (src_ip, dst_ip, threat, datetime.now().isoformat()))
        conn.commit()
        conn.close()

def start_sniffing():
    sniff(iface="eth0", prn=log_packet, store=0)  # Replace 'eth0' with your interface