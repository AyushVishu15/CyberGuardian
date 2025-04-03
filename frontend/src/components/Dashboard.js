import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import ThreatMap from './ThreatMap';
import Alerts from './Alerts';
import Simulator from './Simulator';

function Dashboard() {
  const [traffic, setTraffic] = useState([]);

  useEffect(() => {
    const fetchTraffic = async () => {
      const res = await fetch('http://localhost:5000/traffic');
      const data = await res.json();
      setTraffic(data);
    };
    fetchTraffic();
    const interval = setInterval(fetchTraffic, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const mitigateThreat = async (src_ip, threat) => {
    const res = await fetch('http://localhost:5000/mitigate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ src_ip, threat }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <Grid container spacing={3} style={{ padding: 20 }}>
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5">Threat Map</Typography>
          <ThreatMap traffic={traffic} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5">Alerts</Typography>
          <Alerts traffic={traffic} mitigateThreat={mitigateThreat} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5">Attack Simulator</Typography>
          <Simulator />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;