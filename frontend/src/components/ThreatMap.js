import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ThreatMap({ traffic }) {
  const data = {
    labels: traffic.map(t => t.src_ip),
    datasets: [{
      label: 'Threat Level',
      data: traffic.map(t => t.threat === 'suspicious' ? 1 : 0),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }],
  };

  return <Bar data={data} />;
}

export default ThreatMap;