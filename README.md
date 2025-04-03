# CyberGuardian
A real-time threat detection and mitigation dashboard for cybersecurity.

## Features
- Real-time network monitoring
- ML-based threat detection
- Automated mitigation
- Interactive dashboard with visualizations
- Attack simulation

## Setup
1. **Backend**: `cd backend && pip install -r requirements.txt`
2. **Frontend**: `cd frontend && npm install && npm start`
3. **Docker**: `docker-compose -f docker/docker-compose.yml up --build`

## Usage
- Visit `http://localhost:3000` for the dashboard.
- Requires root privileges for network sniffing (adjust `sniffer.py` interface).

## Tech Stack
- Python, Flask, scapy
- React, Material-UI, Chart.js
- Docker