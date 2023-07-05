import React, { useEffect, useState } from 'react';
import { DatoHistoricosData } from './Tipos';

type Data = DatoHistoricosData;


type Props = {
  data: Data[];
  selectedStations: string[];
};

const DatoHistoricos: React.FC<Props> = ({ data, selectedStations }) => {
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

  const obtenerValorMaximo = (sourceId: string) => {
    const maxItem = data.find((item) => item.sourceId === sourceId);
    return maxItem || { max_value: 0, max_date: new Date() };
  };
  
  const filteredData = data.filter((item) => selectedStations.includes(item.sourceId));

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', marginBottom: '20px', marginLeft: '5px' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Estación</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Valor Máximo</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Fecha Máxima</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.sourceId}>
              <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[item.sourceId]}</td>
              <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.max_value}</td>
              <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.max_date && item.max_date.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatoHistoricos;


// import React, { useEffect, useState } from 'react';

// type Data = {
//   sourceId: string;
//   value: number;
//   max_value: number;
//   max_date: Date;
// };

// type Props = {
//   data: Data[];
// };

// const DatoHistoricos: React.FC<Props> = ({ data }) => {
//   const [idNames, setIdNames] = useState<{ [key: string]: string }>({});

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
//   }, []);

//   const obtenerValorMaximo = (sourceId: string) => {
//     const filterData = data.filter((item) => item.sourceId === sourceId);
//     const maxItem = filterData.reduce((max, item) => {
//       if (item.max_value > max.max_value) {
//         return item;
//       } else {
//         return max;
//       }
//     }, filterData[0]);
//     return maxItem || { max_value: 0, max_date: new Date() }; // Devuelve un objeto vacío con valores predeterminados si maxItem es undefined
//   };
  

//   return (
//     <div>
//       <table style={{ borderCollapse: 'collapse', marginBottom: '20px', marginLeft: '5px' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Estación</th>
//             <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Valor Máximo</th>
//             <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>Fecha Máxima</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from(new Set(data.map((item) => item.sourceId))).map((sourceId) => (
//             <tr key={sourceId}>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{idNames[sourceId]}</td>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{obtenerValorMaximo(sourceId).max_value}</td>
//               <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{obtenerValorMaximo(sourceId).max_date && obtenerValorMaximo(sourceId).max_date.toISOString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DatoHistoricos;
