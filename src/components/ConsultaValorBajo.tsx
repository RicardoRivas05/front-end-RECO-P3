import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export interface DatosTabla2 {
  minValue: number;
  stationId: string;
  date: string;
}

const TableVMinHist = ({ datos }: any) => {
  const [idNames, setIdNames] = useState<{ [key: string]: string }>({});

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
  }, []);

  const formatDate = (dateTime: string) => {
    return dayjs(dateTime).format('YYYY-MM-DD HH:mm');
  };

  const formatValue = (value: number) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  };
  

  return (
    <table style={{ borderCollapse: 'collapse', marginBottom: '20px', marginLeft: '5px' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Estación</th>
          <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Valor más Bajo Histórico (mi/h)</th>
          <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((dato: DatosTabla2, index: number) => (
          <tr key={index}>
            <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[dato.stationId] || ''}</td>
            <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{formatValue(dato.minValue)}</td>
            <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{dato.date ? formatDate(dato.date) : ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableVMinHist;
