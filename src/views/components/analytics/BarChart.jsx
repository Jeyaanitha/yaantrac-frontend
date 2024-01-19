import React from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { convertToLocalDateAndTime } from '../../../utils/CommonFunctions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ trackingData }) => {
  const labels = trackingData?.map(item => convertToLocalDateAndTime(item?.timestamp));
  const speed = trackingData?.map(item => item?.speed);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: speed,
        backgroundColor: '#000000'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Bar Chart' } }
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
