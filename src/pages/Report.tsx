import React,{useState} from 'react';
import { GraphicReport, TableReport, ParametersReport } from '../components';
import { Col, Row, Button, Space, Typography } from 'antd';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { getDatos } from '../helpers';

const { Title } = Typography;
export const Report: React.FC = () => {
  const [data, setData] = useState<any>([]);

  const HandleParameters = async (fechas:string[], estacion:string[])=>{
    const queryResult = await getDatos(estacion,fechas)
    setData(queryResult)
  }

  return (
  <>
    <ParametersReport HandleParameters={HandleParameters}/>
    <br/>
    <Row gutter={16}>
      <Col span={1}></Col>
      <Col span={22}>
        <Space wrap>
          <br />
          <Button type="primary" shape='round' style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}><PrinterOutlined /> Imprimir</Button>
          <Button type="primary" shape='round' style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}><DownloadOutlined /> Exportar</Button>
        </Space>
        <br />
        <div className='print'>
        <Title style={{ textAlign: 'center', fontWeight: 'bold', color: 'cornflowerblue', fontFamily: 'Arial' }}>Reporte de Estaciones</Title>
        <GraphicReport data={data}></GraphicReport>
        <br />
        <TableReport data={data}></TableReport>
        </div>
      </Col>
      <Col span={1}></Col>
    </Row>

  </>
)};

export default Report;
