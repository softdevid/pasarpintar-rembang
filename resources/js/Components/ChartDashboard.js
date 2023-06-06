import React, { useState, useEffect } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ChartDashboard = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('/api/laporan')
      .then(response => setSales(response.data))
      .catch(error => console.log(error));
  }, []);
  // Fungsi untuk mengubah format angka menjadi format mata uang rupiah
  const formatRupiah = (value) => `Rp ${numeral(value).format('0,0')}`;

  const data = {
    labels: sales.map((data) => data.tglOrder),
    datasets: [
      {
        label: 'Omset',
        data: sales.map((data) => data.total),
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1,
        responsive: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
    },
  };

  return (
    <>
      <div className="bg-white rounded-lg w-auto h-auto mt-3">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default ChartDashboard;
