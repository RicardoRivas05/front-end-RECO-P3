import React from 'react';
import { Table} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Col, Row } from 'antd';
import dayjs from 'dayjs'

interface Table1 {
  id: React.Key;
  sourceId: string;
  dateTime: string;
  value: number;
}

const columns: ColumnsType<Table1> = [
  {
    title: 'Fecha',
    dataIndex: 'dateTime',
    render: (_, { dateTime }) => (
      <>{dateTime}</>
    ),
  },
  {
    title: 'Source',
    dataIndex: 'sourceId',
  },
  {
    title: 'Velocidad (mi/h)',
    dataIndex: 'value',
  },
];

export const TableReport: React.FC = (data: any) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Table style={{ width: '90%', margin: 'auto' }} columns={columns} dataSource={data.data} size="middle" rowKey="id" />
        </Col>
      </Row>
    </>
  );
}
export default TableReport;
