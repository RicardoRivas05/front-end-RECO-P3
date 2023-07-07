import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface TableProps {
  data: {
    sourceId: string;
    value: number;
    dateTime: string;
  }[];
  selectedStations: string[];
}

const TableVMin: React.FC<TableProps> = ({ data, selectedStations }) => {
  const [idNames, setIdNames] = useState<{ [key: string]: string }>({});
  const [minFech, setMinFech] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const idNamesResponse: { [key: string]: string } = {
      "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
      "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
      "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
      "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
      "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
      "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
    };
    setIdNames(idNamesResponse);

    const getMinMaxFech = () => {
      const minFech: { [key: string]: string } = {};
      selectedStations.forEach((stationId) => {
        const stationData = data.filter((item) => item.sourceId === stationId);
        const sortedData = stationData.sort((a, b) => a.value - b.value); // Orden ascendente para obtener el valor más bajo
        if (sortedData.length > 0) {
          minFech[stationId] = sortedData[0].dateTime;
        }
      });
      return minFech;
    };

    const minFech = getMinMaxFech();
    setMinFech(minFech);
  }, [data, selectedStations]);

  const getMinValues = () => {
    const minValues: { [key: string]: number } = {};
    selectedStations.forEach((stationId) => {
      const stationData = data.filter((item) => item.sourceId === stationId);
      const stationMin = Math.min(...stationData.map((item) => item.value)); // Usar Math.min en lugar de Math.max
      minValues[stationId] = stationMin;
    });
    return minValues;
  };

  const minValues = getMinValues();

  const formatDate = (dateTime: string) => {
    return dayjs(dateTime).format('YYYY-MM-DD HH:mm');
  };

  return (
    <table style={{ borderCollapse: 'collapse', marginBottom: '20px', marginLeft: '5px' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Estación</th>
          <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Valor más Bajo (mi/h)</th>
          <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(minValues).map((sourceId) => (
          <tr key={sourceId}>
            <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[sourceId]}</td>
            <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{minValues[sourceId]}</td>
            <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{formatDate(minFech[sourceId])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableVMin;
