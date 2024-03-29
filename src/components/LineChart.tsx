import React from 'react';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

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
  // Filtrar los datos por las estaciones seleccionadas
  const filteredData = data.filter((item) => selectedStations.includes(item.sourceId));
  


  // Agrupar los datos por estación
  const groupedData: { [key: string]: DataItem[] } = {};
  filteredData.forEach((item) => {
    if (!groupedData[item.sourceId]) {
      groupedData[item.sourceId] = [];
    }
    groupedData[item.sourceId].push(item);
  });

  

  // Generar datasets para el gráfico
  const datasets = Object.keys(groupedData).map((stationId) => {
    const stationData = groupedData[stationId];
    const stationName = getStationName(stationId);

    return {
      label: stationName,
      data: stationData.map((item) => ({
        x: moment(item.dateTime).toDate(),
        y: item.value,
      })),
      linetension: 0.2,
      fill: false,
      borderColor: getRandomColor(),
      backgroundColor: getRandomColor(),
      pointRadius: 1,
      pointBorderColor: getRandomColor(),
      pointBackgroundColor: getRandomColor(),
    };
  });


  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'dd/MM/yyyy',
          displayFormats: {
            day: 'dd/MM/yyyy',
          },
        },
      },
    },
  };
  
  return <Line data={{ datasets }} options={options} />;
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