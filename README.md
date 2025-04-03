# CyberGuardian Dashboard

A web-based network monitoring dashboard built with Flask (backend) and React (frontend). This project is a demonstration tool that simulates network monitoring features, including traffic visualization, device status grids, and a DDoS simulation, using dummy data. It’s designed for educational purposes or as a portfolio piece.

## Features
- **Traffic Monitoring**: Displays traffic volume over time (line chart) and top applications by traffic (bar chart) using pre-loaded dummy data.
- **Device and Interface Status**: Shows the status of Netflow devices and interfaces with color-coded grids (green: healthy, yellow: warning, red: critical), randomly generated for demo purposes.
- **Traffic Logs**: Lists simulated network traffic logs with source IPs, threats, timestamps, and applications.
- **DDoS Simulation**: Allows users to simulate a DDoS attack and mitigate it, adding logs to the dashboard.
- **Real-Time Updates**: Refreshes every 5 seconds to reflect simulated changes.

## Screenshots
![CyberGuardian Dashboard]
![image](https://github.com/user-attachments/assets/3ffb0bc6-de83-4847-a299-d23dea779a35)
![image](https://github.com/user-attachments/assets/b1e1014f-8864-434b-97cb-eedbb2017cd6)
![image](https://github.com/user-attachments/assets/6112b6d8-48fc-4818-a02e-2e63a94484a3)

*Screenshot of the dashboard showing traffic graphs, device statuses, and logs.*

## Current State
- **Data**: Uses dummy data for demonstration:
  - Traffic data is sourced from `backend/traffic_data.json`.
  - Device and interface statuses are randomly generated.
  - Traffic logs are simulated and stored in an SQLite database (`traffic_logs.db`).
- **Demo-Only**: This is a static prototype designed to showcase functionality with simulated data.

## Prerequisites
- **Python 3.12**: For the backend.
- **Node.js and npm**: For the frontend.
- **Git**: To clone and manage the repository.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AyushVishu15/CyberGuardian.git
   cd CyberGuardian
