import React from 'react';
import { Table, Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Col, Row } from 'antd';

interface Table1 {
  key: React.Key;
  estacion1: string;
  vMaximo: number;
  fHora: string;
}

interface Table2 {
  key: React.Key;
  estacion1: string;
  vMinimo: number;
  fHora: string;
}

const columns: ColumnsType<Table1> = [
  {
    title: 'Estacion 1',
    dataIndex: 'estacion1',
  },
  {
    title: 'Valo maximo (mi/h)',
    dataIndex: 'vMaximo',
  },
  {
    title: 'Fecha/Hora',
    dataIndex: 'fHora',
  },
];

const columns2: ColumnsType<Table2> = [
  {
    title: 'Estacion 1',
    dataIndex: 'estacion1',
  },
  {
    title: 'Valo minimo (mi/h)',
    dataIndex: 'vMinimo',
  },
  {
    title: 'Fecha/Hora',
    dataIndex: 'fHora',
  },
];

const data: Table1[] = [
  {
    key: '1',
    estacion1: 'John Brown',
    vMaximo: 32,
    fHora: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    estacion1: 'Jim Green',
    vMaximo: 42,
    fHora: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    estacion1: 'Joe Black',
    vMaximo: 32,
    fHora: 'Sydney No. 1 Lake Park',
  },
];

const data2: Table2[] = [
  {
    key: '1',
    estacion1: 'John Brown',
    vMinimo: 32,
    fHora: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    estacion1: 'Jim Green',
    vMinimo: 42,
    fHora: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    estacion1: 'Joe Black',
    vMinimo: 32,
    fHora: 'Sydney No. 1 Lake Park',
  },
];
export const TableForm: React.FC = () => (
  <>
    <Row>
      <Col span={12}>
        <Divider/>
        <Table style={{ width: '90%', margin: 'auto' }} columns={columns} dataSource={data} size="middle" />
      </Col>
      <Col span={12}>
      <Divider/>
        <Table style={{ width: '90%', margin: 'auto' }} columns={columns2} dataSource={data2} size="middle" />
      </Col>
    </Row>
  </>
);

export default TableForm;
