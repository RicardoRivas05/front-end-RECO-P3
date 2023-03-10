import React, { useState } from 'react';
import { Table, Button, Space  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  fecha: string;
  estacion1: number;
  estacion2: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    width: 350,
  },
  {
    title: 'Estacion 1',
    dataIndex: 'estacion1',
    width: 300,
  },
  {
    title: 'Estacion 2',
    dataIndex: 'estacion2',
  }, 
];

export const TableReport: React.FC = () => {
    const [data, setData] = useState<DataType[]>([
      {
        key: '1',
        fecha: 'John Brown',
        estacion1: 32,
        estacion2: 32,
      },
      {
        key: '2',
        fecha: 'Jim Green',
        estacion1: 42,
        estacion2: 32.2,
      },
      {
        key: '3',
        fecha: 'Joe Black',
        estacion1: 32,
        estacion2: 38.4,
      },
    ]);
  
    const handleDelete = (key: React.Key) => {
      const newData = data.filter(item => item.key !== key);
      setData(newData);
    };
  
    return (
      <>
        <Table columns={[...columns, {
          title: 'Action',
          dataIndex: 'action',
          width: 250,
          render: (_text: string, record: DataType) =>
          <Space wrap>
            <Button type="primary" style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}><EditOutlined /></Button>
            <Button type="primary" danger onClick={() => handleDelete(record.key)} ><DeleteOutlined /></Button>
            </Space>
        }]} dataSource={data} size="small" style={{ margin:'auto', width:'90%' }}/>
      </>
    );
  };
  
  export default TableReport;
