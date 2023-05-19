import React from 'react'

interface TableProps{
    data: {sourceId: string; value: number}[];
}
 const TableVMax: React.FC<TableProps> = ({data}) => {
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

  const maxValues = getMaxValues ();

  return(
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Valor mas Alto</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(maxValues).map((sourceId)=> 
                <tr key={sourceId}>
                    <td>{sourceId}</td>
                    <td>{maxValues[sourceId]}</td>
                </tr>
            )}
        </tbody>
    </table>
  );
};

export default TableVMax;
