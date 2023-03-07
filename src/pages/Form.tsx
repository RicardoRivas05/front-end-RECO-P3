import React from 'react';
import GraphicReport from '../components/GraphicReport';
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
  console.log(`selected ${value}`);
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
        <Card title="Fecha Inicio" bordered={true}>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChangeFecha} onOk={onOk} />
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Fecha Final" bordered={true}>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChangeFecha} onOk={onOk} />
          </Space>
        </Card>
      </Col>
      <Col span={5}>
        <Card title="Variable" bordered={true}>
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
                value: 'var_tipo_1',
                label: 'var_tipo_1',
              },
              {
                value: 'var_tipo_2',
                label: 'var_tipo_2',
              },
              {
                value: 'var_tipo_3',
                label: 'var_tipo_3',
              },
            ]}
          />
        </Card>
      </Col>
      <Col span={5}>
        <Card title="Grafica" bordered={true} style={{ }} >
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
      <Col span={23}>
        <Space wrap>
          <br/>
          <Button type="primary"><PrinterOutlined /> Imprimir</Button>
          <Button type="primary"><DownloadOutlined /> Exportar</Button>
        </Space>
      <br/>
      <Title style={{ textAlign: 'center', fontWeight: 'bold', color:'cornflowerblue' }}>Reporte</Title>
      <GraphicReport></GraphicReport>
      </Col>
    </Row>
  </div>
);

export default Form;
