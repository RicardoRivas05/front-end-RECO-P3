import React, {useEffect, useState} from 'react';

type Data = {
    sourceId: string;
    value: number;
};

type Props = {
    data:Data[];
}

const Promedio: React.FC<Props> = ({data}) => {
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

    const calcularPromedio = (sourceId:string)=>{
        const filterData = data.filter(item => item.sourceId === sourceId);
        const sum = filterData.reduce((accumulator, item) => accumulator + item.value, 0);
        const average = sum / filterData.length;
        return average.toFixed(2);
    }


  return (
    <div>
        <table style={{borderCollapse:'collapse', marginBottom:'20px', marginLeft:'5px'}}>
            <thead>
                <tr>
                    <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Estación</th>
                    <th style={{padding:'8px', textAlign:'left', borderBottom:'1px solud #ddd', backgroundColor:'#f2f2f2'}}>Promedio (mi/h)</th>
                </tr>

            </thead>
            <tbody>
                {Array.from(new Set(data.map(item => item.sourceId))).map(sourceId =>(
                <tr key={sourceId}>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{idNames[sourceId]}</td>
                    <td style={{padding:'8px', textAlign:'left', borderBottom:'1px solid #ddd'}}>{calcularPromedio(sourceId)}</td>
                </tr>
                ))}                
            </tbody>
        </table>
    </div>
  )
}

export default Promedio;
