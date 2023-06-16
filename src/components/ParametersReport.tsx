import React, { useEffect, useState } from 'react';
import { Card, Col, Row, DatePicker, Space, Select, Button } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { FundTwoTone } from '@ant-design/icons';
import {  getSource } from '../helpers';

const { RangePicker } = DatePicker;

export const ParametersReport: React.FC = ({HandleParameters}:any) => {
  const [dataSource, setSource] = useState<any>();
  const [fechas,setFechas] = useState<any>([]);
  const [estaciones,setEstaciones] = useState<any>('');

  const HandleSource = async () => {
    const getData = await getSource()
    const list = getData.map((item) => {
      return { "label": item.name, "value": item.id }
    })
    setSource(list)
  }
  useEffect(() => {
    HandleSource()
  }, []);

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string],
  ) => {
    setFechas(dateString)
  };

  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <Card title="Seleccionar Parametros" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
          <Row>
            <Col span={10}>
            <Space direction="vertical" size={12}>
                <RangePicker
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                />
              </Space>
            </Col>
            <Col span={10}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '90%' }}
                placeholder="Seleccionar estaciones "
                onChange={setEstaciones}
                options={dataSource}
              />
            </Col>
            <Col span={3}>
              <Button type="primary" shape="round" icon={<FundTwoTone />} size="middle" 
              onClick={()=>{
                HandleParameters(fechas,estaciones)
              }} 
              >
                Generar Reporte
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={1}></Col>
    </Row>
  )
};

export default ParametersReport;