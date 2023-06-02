import React, {useEffect, useState} from 'react';
import {getDatos} from '../helpers';

interface TableProps{
    data: {
        sourceId: string,
        value: number;
        dateTime: string;
    }[];
}

export const PruebasGetName: React.FC<TableProps> = ({data}) => {
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
    

    const getMaxValues = () => {
    const maxValues: {[key:string]: number} = {};
    data.forEach((item) => {
        const {sourceId, value} = item;
        if(!maxValues[sourceId] || value > maxValues[sourceId]){
            maxValues[sourceId] = value;
        }
    });
    return maxValues
  };

  const getMaxFech = () => {
    const maxValues: {[key:string]: number} = {};
    const getFech: {[key:string]: string} = {};
    data.forEach((item) => {
        const {sourceId, value, dateTime} = item;
        if(!maxValues[sourceId] || value > maxValues[sourceId]){
            getFech[sourceId] = dateTime
        }
    });
    return getFech;
  }

  const maxValues = getMaxValues ();
  const getFech = getMaxFech();

  return(
    <table style={{borderCollapse:'collapse', marginBottom:'20px', marginLeft:'2px'}}>
        <thead>
            <tr>
                <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Nombre</th>
                <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Valor mas Alto</th>
                <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Fecha</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(maxValues).map((sourceId)=> 
                <tr key={sourceId}>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{idNames[sourceId]}</td>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{maxValues[sourceId]}</td>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{getFech[sourceId]}</td>
                </tr>
            )}
        </tbody>
    </table>
  );
};

export default PruebasGetName;

