import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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
  },
  {
    title: 'Estacion 1 (mi/h)',
    dataIndex: 'estacion1',
  },
  {
    title: 'Estacion 2 (mi/h)',
    dataIndex: 'estacion2',
  },
];

const data: DataType[] = [
  {
    key: '1',
    fecha: 'John Brown',
    estacion1: 32,
    estacion2: 35,
  },
  {
    key: '2',
    fecha: 'Jim Green',
    estacion1: 42,
    estacion2: 42,
  },
  {
    key: '3',
    fecha: 'Joe Black',
    estacion1: 32,
    estacion2: 52,
  },
];

const SecondTableReport: React.FC = () => (
  <>
    <br/>
        <Table style={{ width: '95%', margin: 'auto' }} columns={columns} dataSource={data} 
        footer={() => (
            <tr>
              <td colSpan={3}>
                <div>Promedio</div>
              </td>
            </tr>
        )}
        />
  </>
);

export default SecondTableReport;

