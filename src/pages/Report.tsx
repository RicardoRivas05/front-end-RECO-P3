import React from 'react';
import GraphicReport from '../components/GraphicReport';
import Parameters from '../components/ParametersReport';
import TableReport from '../components/TableReport';
import { Col, Row, Button } from 'antd';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import SecondTableReport from '../components/SecondTableReport';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const onChangeFecha = (
  value: DatePickerProps['value'],
  dateString: [string, string] | string,
) => {
  console.log('Selected Time: ', value)
};

const onOk = (value: DatePickerProps['value']) => {
  console.log('onOk: ', value);
};

//Variable
const onChangeV = (value: string) => {
  console.log(`Seleccionar fecha`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

export const Report: React.FC = () => (
  <div>
    <br/>
    <Parameters></Parameters>
    <br/>
    <Row gutter={16}>
    <Col span={1}></Col>
      <Col span={22}>
        <Space wrap>
          <br/>
          <Button type="primary" shape='round' style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}><PrinterOutlined /> Imprimir</Button>
          <Button type="primary" shape='round' style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}><DownloadOutlined /> Exportar</Button>
        </Space>
      <br/>
      <Title style={{ textAlign: 'center', fontWeight: 'bold', color:'cornflowerblue', fontFamily: 'Arial' }}>Reporte</Title>
      <GraphicReport></GraphicReport>
      <br/>
      <TableReport ></TableReport>
      </Col>
      <Col span={1}></Col>
    </Row>
    
  </div>
);

export default Report;
