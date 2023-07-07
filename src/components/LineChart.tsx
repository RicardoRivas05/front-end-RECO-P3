import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

type DataItem = {
  dateTime: string;
  value: number;
  sourceId: string;
};

type Props = {
  data: DataItem[];
  selectedStations: string[];
};

const LineChart: React.FC<Props> = ({ data, selectedStations }) => {
  const uniqueDates = [...new Set(data.map((item) => item.dateTime))].sort();
  const formattedDates = uniqueDates.map((date) => moment(date).format('YYYY-MM-DD HH:mm:ss'));

  const labels = formattedDates;

  const datasets = selectedStations.map((stationId) => {
    const stationData = data.filter((item) => item.sourceId === stationId);
    const stationName = getStationName(stationId);
    return {
      label: stationName,
      data: stationData.map((item) => item.value),
      tension: 0.2,
      fill: false,
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(),
      pointRadius: 0,
      pointBorderColor: getRandomColor(),
      pointBackgroundColor: getRandomColor(),
    };
  });

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
          unit: 'day',
          displayFormats: {
            day: 'YYYY-MM-DD',
          },
          min: labels[0], // Establecer la fecha mínima como la primera fecha en el conjunto de datos
          max: labels[labels.length - 1], // Establecer la fecha máxima como la última fecha en el conjunto de datos
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const getStationName = (stationId: string): string => {
  const stationNames: { [key: string]: string } = {
    "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
    "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
    "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
    "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
    "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
    "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
  };
  return stationNames[stationId] || stationId;
};

const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export default LineChart;

