import React, { useEffect, useState } from 'react';
import { Card, Col, Row, DatePicker, Space, Select, Button, message } from 'antd';
import { FundTwoTone } from '@ant-design/icons';
import moment, {Moment} from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { getSource } from '../helpers';
import { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ParametersReportProps {
  handleParameters: (fechas: string[], estacion: string[]) => Promise<void>;
}

export const ParametersReport: React.FC<ParametersReportProps> = ({ handleParameters }) => {
  const [dataSource, setSource] = useState<any>();
  const [fechaInicio, setFechaInicio] = useState<Dayjs | null>(null);
  const [fechaFin, setFechaFin] = useState<Dayjs | null>(null);
  const [estaciones, setEstaciones] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCustomRangeDisabled, setIsCustomRangeDisabled] = useState(false);

  const HandleSource = async () => {
    const getData = await getSource();
    const list = getData.map((item: any) => {
      return { label: item.name, value: item.id };
    });
    setSource(list);
  };

  useEffect(() => {
    HandleSource();
  }, []);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => {
    setFechaInicio(dates[0]);
    setFechaFin(dates[1]);
  };
  
   

  const handleSelectedRange = (value: string) => {
    setSelectedRange(value);
    setIsButtonDisabled(!value && estaciones.length === 0);
    setFechaInicio(null);
    setFechaFin(null);
    setIsCustomRangeDisabled(false);
  };

  const handleEstacionesChange = (selectedEstaciones: string[]) => {
    setEstaciones(selectedEstaciones);
    setIsButtonDisabled(!selectedRange && selectedEstaciones.length === 0);
  };

  const handleGenerateReport = () => {
    if ((!fechaInicio || !fechaFin) && !selectedRange) {
      message.error('Por favor, complete el rango de fecha.');
      return;
    }

    if (estaciones.length === 0) {
      message.error('Por favor, seleccione al menos una estación.');
      return;
    }

    if (selectedRange) {
      const today = dayjs().startOf('day');
      let startDate: Dayjs | null = null;
      let endDate: Dayjs | null = null;

      switch (selectedRange) {
        case '1':
          startDate = today.subtract(1, 'day');
          endDate = today;
          break;
        case '3':
          startDate = dayjs().subtract(3, 'days').startOf('day');
          endDate = dayjs().endOf('day');
          break;
        case '7':
          startDate = dayjs().subtract(1, 'week').startOf('day');
          endDate = dayjs().endOf('day');
          break;
        case '14':
          startDate = dayjs().subtract(2, 'weeks').startOf('day');
          endDate = dayjs().endOf('day');
          break;
        case '30':
          startDate = dayjs().subtract(1, 'month').startOf('day');
          endDate = dayjs().endOf('day');
          break;
        default:
          startDate = null;
          endDate = null;
      }

      handleParameters([startDate?.format('YYYY-MM-DD') ?? '', endDate?.format('YYYY-MM-DD') ?? ''], estaciones);
    } else {
      const fechaInicioString = fechaInicio ? fechaInicio.format('YYYY-MM-DD') : '';
      const fechaFinString = fechaFin ? fechaFin.format('YYYY-MM-DD') : '';
      handleParameters([fechaInicioString, fechaFinString], estaciones);
    }
  };

  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <Card title="Seleccionar Parámetros" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
          <Row>
            <Col span={10}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  format="YYYY-MM-DD"
                  onChange={handleDateChange}
                  disabled={!!selectedRange}
                />
              </Space>
            </Col>
            <Col span={10}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '90%' }}
                placeholder="Seleccionar estaciones"
                onChange={handleEstacionesChange}
                options={dataSource}
              />
            </Col>
            <Col span={3}>
              <Button
                type="primary"
                shape="round"
                icon={<FundTwoTone />}
                size="middle"
                onClick={handleGenerateReport}
                disabled={isButtonDisabled}
              >
                Generar Reporte
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={10}>
              <Select
                style={{ width: '90%' }}
                placeholder="Seleccionar rango predefinido"
                onChange={handleSelectedRange}
                value={selectedRange}
                disabled={isCustomRangeDisabled}
              >
                <Option value="">Seleccionar rango predefinido</Option>
                <Option value="1">1 día</Option>
                <Option value="3">3 días</Option>
                <Option value="7">1 semana</Option>
                <Option value="14">2 semanas</Option>
                <Option value="30">1 mes</Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={1}></Col>
    </Row>
  );
};

export default ParametersReport;