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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  const formattedDates = uniqueDates.map((date) => {
    const formattedDate = new Date(date).toISOString();
    return formattedDate.slice(0, 19).replace('T', ' ');
  });

  const labels = formattedDates;

  const datasets = selectedStations.map((stationId) => {
    const stationData = data.filter((item) => item.sourceId === stationId);
    const stationName = getStationName(stationId);
    return {
      label: stationName,
      data: stationData.map((item) => item.value),
      tension: 0.1,
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

  const options = {};

  return <Line data={chartData} options={options} />;
};

// Función para obtener el nombre de la estación según su ID
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

// Función para generar un color aleatorio en formato RGB
const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export default LineChart;

//---------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// type DataItem = {
//   dateTime: string;
//   value: number;
//   sourceId: string;
// };

// type Props = {
//   data: DataItem[];
//   selectedStations: string[];
// };

// const LineChart: React.FC<Props> = ({ data, selectedStations }) => {
//   const labels = data.map((item) => item.dateTime);

//   const datasets = selectedStations.map((stationId) => {
//     const stationData = data.filter((item) => item.sourceId === stationId);
//     const stationName = getStationName(stationId);
//     return {
//       label: stationName,
//       data: stationData.map((item) => item.value),
//       tension: 0.1,
//       fill: false,
//       borderColor: getRandomColor(),
//       backgroundColor: getRandomColor(),
//       pointRadius: 0,
//       pointBorderColor: getRandomColor(),
//       pointBackgroundColor: getRandomColor(),
//     };
//   });

//   const chartData = {
//     labels,
//     datasets,
//   };

//   const options = {};

//   return <Line data={chartData} options={options} />;
// };

// // Función para obtener el nombre de la estación según su ID
// const getStationName = (stationId: string): string => {
//   const stationNames: { [key: string]: string } = {
//     "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
//     "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
//     "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
//     "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
//     "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
//     "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
//   };
//   return stationNames[stationId] || stationId;
// };

// // Función para generar un color aleatorio en formato RGB
// const getRandomColor = (): string => {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// };

// export default LineChart;