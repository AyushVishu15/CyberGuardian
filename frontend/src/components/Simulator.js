import React from 'react';
import { Button } from '@mui/material';

function Simulator() {
  const simulateAttack = () => {
    alert('Simulating DDoS attack... (Add real logic in backend)');
  };

  return <Button variant="contained" onClick={simulateAttack}>Simulate DDoS</Button>;
}

export default Simulator;
