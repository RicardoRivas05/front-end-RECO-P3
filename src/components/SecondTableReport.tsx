import React, { useEffect, useState } from 'react'
import { getDatos } from '../helpers';
import dayjs from 'dayjs';

interface TableProps{
    data: {
        sourceId: string;
        value: number;
        dateTime: string
    }[];
}



 const TableVMin: React.FC<TableProps> = ({data}) => {
    const [idNames, setIdNames] = useState<{[key:string]: string}>({});

    useEffect(() => {



        const  idNamesResponse:{[key:string]:string} = {
            "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
            "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
            "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
            "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
            "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
            "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
        };
        setIdNames(idNamesResponse);
    },[]);


  const getMinValues = () => {
    const minValues: {[key:string]: number} = {};
    data.forEach((item) => {
        const {sourceId, value} = item;
        if(!minValues[sourceId] || value < minValues[sourceId]){
            minValues[sourceId] =  value;
        }
    });
    return minValues 
  };

  const getMinFech = () => {
    const minFech: {[key:string]: string} = {};
    data.forEach((item) => {
        const {sourceId, value, dateTime} = item;
        if(!minFech[sourceId] || value < Number(minFech[sourceId])){
            const formattedDate = dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
            minFech[sourceId] = formattedDate;
        }
    });
    return minFech;
  }

  const minValues = getMinValues ();
  const minFech = getMinFech();

  return(
    
    <table style={{borderCollapse:'collapse', marginBottom:'20px', marginLeft:'5px'}}>
        <thead>
            <tr>
                <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Estación</th>
                <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Valor mas Bajo</th>
                <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Fecha</th>
                
            </tr>
        </thead>
        <tbody>
            {Object.keys(minValues).map((sourceId)=> 
                <tr key={sourceId}>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{idNames[sourceId]}</td>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{minValues[sourceId]}</td>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{minFech[sourceId]}</td>
                    
                </tr>
            )}
        </tbody>
    </table>
  );
};

export default TableVMin;
