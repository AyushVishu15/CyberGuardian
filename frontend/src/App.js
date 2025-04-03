import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function App() {
  const [traffic, setTraffic] = useState([]);
  const [trafficVolume, setTrafficVolume] = useState([]);
  const [topApps, setTopApps] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState({ devices: [], interfaces: [] });

  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        const res = await fetch('http://localhost:5000/traffic');
        const data = await res.json();
        setTraffic(data);
      } catch (error) {
        console.error('Error fetching traffic:', error);
      }
    };

    const fetchTrafficVolume = async () => {
      try {
        const res = await fetch('http://localhost:5000/traffic-volume');
        const data = await res.json();
        setTrafficVolume(data);
      } catch (error) {
        console.error('Error fetching traffic volume:', error);
      }
    };

    const fetchTopApps = async () => {
      try {
        const res = await fetch('http://localhost:5000/top-apps');
        const data = await res.json();
        setTopApps(data);
      } catch (error) {
        console.error('Error fetching top apps:', error);
      }
    };

    const fetchDeviceStatus = async () => {
      try {
        const res = await fetch('http://localhost:5000/device-status');
        const data = await res.json();
        setDeviceStatus(data);
      } catch (error) {
        console.error('Error fetching device status:', error);
      }
    };

    fetchTraffic();
    fetchTrafficVolume();
    fetchTopApps();
    fetchDeviceStatus();
    const interval = setInterval(() => {
      fetchTraffic();
      fetchTrafficVolume();
      fetchTopApps();
      fetchDeviceStatus();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const simulateDDoS = async () => {
    try {
      const res = await fetch('http://localhost:5000/simulate-ddos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      console.log(result.message);
      const trafficRes = await fetch('http://localhost:5000/traffic');
      const newTraffic = await trafficRes.json();
      setTraffic(newTraffic);
    } catch (error) {
      console.error('Error simulating DDoS:', error);
    }
  };

  const mitigateThreat = async (ip) => {
    try {
      const res = await fetch('http://localhost:5000/mitigate-threat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      console.error('Error mitigating threat:', error);
    }
  };

  const renderStatusGrid = (items, title) => (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" flexWrap="wrap">
        {(items || []).map(item => (
          <Box
            key={item.id}
            width={20}
            height={20}
            bgcolor={item.status === 'green' ? 'green' : item.status === 'yellow' ? 'yellow' : 'red'}
            m={0.5}
          />
        ))}
      </Box>
    </Box>
  );

  const trafficVolumeData = {
    labels: (trafficVolume || []).map(t => t.time ? new Date(t.time).toLocaleTimeString() : ''),
    datasets: [
      {
        label: 'Traffic Volume (Mbps)',
        data: (trafficVolume || []).map(t => t.volume || 0),
        borderColor: 'cyan',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const topAppsData = {
    labels: (topApps || []).map(app => app.name || 'Unknown'),
    datasets: [
      {
        label: 'Traffic (MB)',
        data: (topApps || []).map(app => app.volume || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>CyberGuardian Dashboard</Typography>
      <Button variant="contained" color="primary" onClick={simulateDDoS} style={{ marginBottom: 20 }}>
        Simulate DDoS Attack
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            {renderStatusGrid(deviceStatus.devices, 'Current Status of Netflow Devices')}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            {renderStatusGrid(deviceStatus.interfaces, 'Current Status of Interfaces')}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography variant="h6">Core Router Traffic</Typography>
            <Typography variant="h4">{(trafficVolume.length > 0 ? trafficVolume[trafficVolume.length - 1].volume : 0) / 1000} Gbps</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography variant="h6">Core Router Availability</Typography>
            <Typography variant="h4" color="green">100%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography variant="h6">Traffic (2.2.2.42)</Typography>
            <Typography variant="h4">{(trafficVolume.length > 0 ? trafficVolume[trafficVolume.length - 1].volume : 0) / 1000} Gbps</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography variant="h6">Availability (2.2.2.16)</Typography>
            <Typography variant="h4" color="green">100%</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Traffic Volume Over Time</Typography>
            <Line data={trafficVolumeData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Top Applications by Traffic</Typography>
            <Bar data={topAppsData} options={{ indexAxis: 'y', responsive: true }} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5">Traffic Logs</Typography>
            <List>
              {(traffic || []).map(t => (
                <ListItem key={t.id} secondaryAction={
                  t.threat === 'ddos' && (
                    <Button variant="outlined" color="secondary" onClick={() => mitigateThreat(t.src_ip)}>
                      Mitigate
                    </Button>
                  )
                }>
                  <ListItemText 
                    primary={`IP: ${t.src_ip} - Threat: ${t.threat} - App: ${t.app}`} 
                    secondary={t.timestamp} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;