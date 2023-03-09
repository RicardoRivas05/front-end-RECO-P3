import React from 'react';
import GraphicReport from '../components/GraphicReport';
import TableForm from '../components/TableForm';
import { Card, Col, Row, Button } from 'antd';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';
import { Select } from 'antd';
import { FundTwoTone, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

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

export const Form: React.FC = () => (
  <div>
    <br/>
    <Row gutter={16}>
    <Col span={1}></Col>
      <Col span={6}>
        <Card title="Fecha Inicio" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChangeFecha} onOk={onOk} />
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Fecha Final" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChangeFecha} onOk={onOk} />
          </Space>
        </Card>
      </Col>
      <Col span={5}>
        <Card title="Variable" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
          <Select
            showSearch
            placeholder="Seleccionar una variable"
            optionFilterProp="children"
            onChange={onChangeV}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 'estacion 1',
                label: 'Estacion 1',
              },
              {
                value: 'estacion 2',
                label: 'Estacion 2',
              },
              {
                value: 'estacion 3',
                label: 'Estacion 3',
              },
              {
                value: 'estacion 4',
                label: 'Estacion 4',
              },
              {
                value: 'estacion 5',
                label: 'Estacion 5',
              },
              {
                value: 'estacion 6',
                label: 'Estacion 6',
              },
            ]}
          />
        </Card>
      </Col>
      <Col span={5}>
        <Card title="Grafica" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
          <Button type="primary" shape="round" icon={<FundTwoTone />} size="middle">
            Mostrar grafica
          </Button>
        </Card>
      </Col>
      <Col span={1}></Col>
    </Row>
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
      <TableForm></TableForm>
      </Col>
      <Col span={1}></Col>
    </Row>
    
  </div>
);

export default Form;
