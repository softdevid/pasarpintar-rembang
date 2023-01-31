import { Line } from 'react-chartjs-2';

const OneWeek = ({ sales }) => {

  const data = {
    labels: sales.map(sale => sale.tglOrder),
    datasets: [
      {
        label: 'Jumlah Terjual',
        data: sales.map(sale => sale.jumlah_terjual),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  console.log(data, options, sales);

  return (
    <Line
      data={data}
      options={options}
    />
  );
}
export default OneWeek;
