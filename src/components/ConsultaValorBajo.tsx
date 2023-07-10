import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getMinValueByStation } from '../helpers';

export interface DatosTabla2 {
  minValue: number;
  stationId: string;
  date: string;
}

const TableVMinHist = ({datos}: any) => {
  const [idNames, setIdNames] = useState<{ [key: string]: string }>({});
  const [minValues, setMinValues] = useState<{ [key: string]: DatosTabla2 | undefined }>({});

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
        {datos.map((dato:DatosTabla2, index: number) => (         
            <tr key={index}>
              <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[dato.stationId]||''}</td>
              <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{dato.minValue || '0'}</td>
              <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{dato.date ?  formatDate(dato.date): ''}</td>
            </tr>
            ))}
      </tbody>
    </table>
  );
};

export default TableVMinHist;

// import React, { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
// import { getMinValueByStation } from '../helpers';

// export interface DatosTabla2 {
//   minValue: number;
//   stationId: string;
//   date: string;
// }

// const TableVMinHist = ({ data, selectedStations }: { data: any[], selectedStations: string[] }) => {
//   const [idNames, setIdNames] = useState<{ [key: string]: string }>({});
//   const [minValues, setMinValues] = useState<{ [key: string]: DatosTabla2 | undefined }>({});

//   useEffect(() => {
//     const idNamesResponse: { [key: string]: string } = {
//       "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
//       "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
//       "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
//       "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
//       "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
//       "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
//     };
//     setIdNames(idNamesResponse);

//     const getMinValuesHistorical = async () => {
//       const minValuesHistorical: { [key: string]: DatosTabla2 | undefined } = {};
//       await Promise.all(selectedStations.map(async (stationId) => {
//         const minValueData = await getMinValueByStation([stationId]); // Pasar stationId como un array
//         if (minValueData) {
//           const minDate = data.find((item) => item.sourceId === minValueData.stationId)?.dateTime || '';
//           minValuesHistorical[stationId] = { ...minValueData, date: minDate };
//         } else {
//           minValuesHistorical[stationId] = undefined;
//         }
//       }));
//       return minValuesHistorical;
//     };

//     const getMinMaxValues = async () => {
//       const minValuesHistorical = await getMinValuesHistorical();
//       setMinValues({ ...minValuesHistorical });
//     };

//     getMinMaxValues();
//   }, [data, selectedStations]);

//   const formatDate = (dateTime: string) => {
//     return dayjs(dateTime).format('YYYY-MM-DD HH:mm');
//   };

//   return (
//     <table style={{ borderCollapse: 'collapse', marginBottom: '20px', marginLeft: '5px' }}>
//       <thead>
//         <tr>
//           <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Estación</th>
//           <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Valor más Bajo (mi/h)</th>
//           <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Fecha</th>
//         </tr>
//       </thead>
//       <tbody>
//         {selectedStations.map((sourceId) => {
//           const minValueData = minValues[sourceId];
//           const formattedDate = minValueData ? formatDate(minValueData.date) : '';

//           return (
//             <tr key={sourceId}>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[sourceId]}</td>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{minValueData ? minValueData.minValue : '-'}</td>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{formattedDate}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default TableVMinHist;




// import React, { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
// import { getMinValueByStation } from '../helpers';

// export interface DatosTabla2 {
//     minValue: number;
//     stationId: string;
//     date: string;
//   }

// interface TableProps {
//   data: {
//     sourceId: string;
//     value: number;
//     dateTime: string;
//   }[];
//   selectedStations: string[];
// }

// const TableVMinHist: React.FC<TableProps> = ({ data, selectedStations }) => {
//   const [idNames, setIdNames] = useState<{ [key: string]: string }>({});
//   const [minValues, setMinValues] = useState<{ [key: string]: number }>({});

//   useEffect(() => {
//     const idNamesResponse: { [key: string]: string } = {
//       "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
//       "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
//       "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
//       "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
//       "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
//       "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
//     };
//     setIdNames(idNamesResponse);

//     const getMinValues = () => {
//       const minValues: { [key: string]: number } = {};
//       selectedStations.forEach((stationId) => {
//         const stationData = data.filter((item) => item.sourceId === stationId);
//         const stationMin = Math.min(...stationData.map((item) => item.value));
//         minValues[stationId] = stationMin;
//       });
//       return minValues;
//     };

//     const getMinValuesHistorical = async () => {
//       const minValuesHistorical: { [key: string]: number } = {};
//       for (const stationId of selectedStations) {
//         const minValueData = await getMinValueByStation([stationId]); // Llamamos a la función con un array de estaciones
//         if (minValueData.length > 0) {
//           minValuesHistorical[stationId] = minValueData[0].minValue;
//         }
//       }
//       return minValuesHistorical;
//     };

//     const getMinMaxValues = async () => {
//       const minValues = getMinValues();
//       const minValuesHistorical = await getMinValuesHistorical();
//       setMinValues({ ...minValues, ...minValuesHistorical });
//     };

//     getMinMaxValues();
//   }, [data, selectedStations]);

//   const formatDate = (dateTime: string) => {
//     return dayjs(dateTime).format('YYYY-MM-DD HH:mm');
//   };

//   return (
//     <table style={{ borderCollapse: 'collapse', marginBottom: '20px', marginLeft: '5px' }}>
//       <thead>
//         <tr>
//           <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Estación</th>
//           <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Valor más Bajo (mi/h)</th>
//           <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Fecha</th>
//         </tr>
//       </thead>
//       <tbody>
//         {selectedStations.map((sourceId) => {
//           const minValue = minValues[sourceId];
//           const date = data.find((item) => item.sourceId === sourceId)?.dateTime || '';
//           return (
//             <tr key={sourceId}>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[sourceId]}</td>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{minValue || '-'}</td>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{formatDate(date)}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// export default TableVMinHist;
