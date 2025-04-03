from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta
import random
import json

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('traffic_logs.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS logs 
                 (id INTEGER PRIMARY KEY, src_ip TEXT, threat TEXT, timestamp TEXT, app TEXT)''')
    conn.commit()
    conn.close()

def add_dummy_data():
    conn = sqlite3.connect('traffic_logs.db')
    c = conn.cursor()
    apps = ['HTTP', 'HTTPS', 'FTP', 'SSH', 'SMTP']
    for _ in range(10):
        c.execute('INSERT INTO logs (src_ip, threat, timestamp, app) VALUES (?, ?, ?, ?)',
                  ('192.168.1.1', 'normal', datetime.now().isoformat(), random.choice(apps)))
        c.execute('INSERT INTO logs (src_ip, threat, timestamp, app) VALUES (?, ?, ?, ?)',
                  ('10.0.0.1', 'suspicious', datetime.now().isoformat(), random.choice(apps)))
    conn.commit()
    conn.close()

@app.route('/traffic', methods=['GET'])
def get_traffic():
    conn = sqlite3.connect('traffic_logs.db')
    c = conn.cursor()
    c.execute('SELECT * FROM logs ORDER BY id DESC LIMIT 100')
    logs = [{"id": r[0], "src_ip": r[1], "threat": r[2], "timestamp": r[3], "app": r[4]} for r in c.fetchall()]
    conn.close()
    return jsonify(logs)

@app.route('/simulate-ddos', methods=['POST'])
def simulate_ddos():
    conn = sqlite3.connect('traffic_logs.db')
    c = conn.cursor()
    malicious_ip = "172.16.0.1"
    base_time = datetime.now()
    apps = ['HTTP', 'HTTPS', 'FTP', 'SSH', 'SMTP']
    for i in range(50):
        timestamp = (base_time + timedelta(milliseconds=i * 10)).isoformat()
        c.execute('INSERT INTO logs (src_ip, threat, timestamp, app) VALUES (?, ?, ?, ?)',
                  (malicious_ip, 'ddos', timestamp, random.choice(apps)))
    conn.commit()
    conn.close()
    return jsonify({"message": "DDoS simulation completed", "ip": malicious_ip, "count": 50}), 200

@app.route('/traffic-volume', methods=['GET'])
def get_traffic_volume():
    with open('traffic_data.json', 'r') as f:
        data = json.load(f)
    return jsonify(data['traffic_volume'])

@app.route('/top-apps', methods=['GET'])
def get_top_apps():
    with open('traffic_data.json', 'r') as f:
        data = json.load(f)
    return jsonify(data['top_apps'])

@app.route('/device-status', methods=['GET'])
def get_device_status():
    devices = [{"id": i, "status": random.choice(['green', 'yellow', 'red'])} for i in range(50)]
    interfaces = [{"id": i, "status": random.choice(['green', 'yellow', 'red'])} for i in range(50)]
    return jsonify({"devices": devices, "interfaces": interfaces})

@app.route('/mitigate-threat', methods=['POST'])
def mitigate_threat():
    return jsonify({"message": "Threat mitigated successfully"}), 200

if __name__ == '__main__':
    init_db()
    add_dummy_data()
    app.run(host='0.0.0.0', port=5000)