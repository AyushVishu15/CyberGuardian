import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';

function Alerts({ traffic, mitigateThreat }) {
  return (
    <List>
      {traffic.filter(t => t.threat !== 'normal').map(t => (
        <ListItem key={t.id}>
          <ListItemText primary={`Threat from ${t.src_ip}: ${t.threat}`} secondary={t.timestamp} />
          <Button variant="contained" color="secondary" onClick={() => mitigateThreat(t.src_ip, t.threat)}>
            Mitigate
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

export default Alerts;