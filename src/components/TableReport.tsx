import React, {useEffect, useState} from 'react';
import { Table} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Col, Row } from 'antd';
import dayjs from 'dayjs'


interface TableItem {
      id: React.Key;
      sourceId: string;
      dateTime: string;
      value: number[];
} 

interface TableProps{
  data: TableItem[];
}


export const TableReport: React.FC<TableProps> = ({data}) => { 
  const [idNames, setIdNames] = useState<{[key:string]: string}>({});
  const sortedData = data.sort((a,b) => {
    const dateA = new Date(a.dateTime).getTime();
    const dateB = new Date(b.dateTime).getTime();

    if(dateA === dateB){
      return a.sourceId.localeCompare(b.sourceId);
    }

    return dateA - dateB;
  });
  
  useEffect(() => {
    const idNamesResponse: {[key:string]:string} = {
      "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
      "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
      "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
      "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
      "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
      "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
    };
    setIdNames(idNamesResponse);
  }, []);

  
const columns: ColumnsType<TableItem> = [
  
  {
    title: 'Fecha',
    dataIndex: 'dateTime',
    render: (_, { dateTime }) => <>{dateTime}</>,
  },
  {
    title: 'Id',
    dataIndex: 'sourceId',
    render:(sourceId) => idNames[sourceId] ||  sourceId,
  },
  {
    title: 'Velocidad (mi/h)',
    dataIndex: 'value',
  },
];

  return (    

    <>
      <Row>
        <Col span={24}>
          <Table 
            style={{ width: '90%', margin: 'auto' }}
            columns={columns} 
            dataSource={sortedData}
            size="middle" 
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  );
}
export default TableReport;
