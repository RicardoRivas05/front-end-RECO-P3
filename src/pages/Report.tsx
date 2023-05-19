import React,{useEffect, useState} from 'react';
import { GraphicReport, TableReport, ParametersReport } from '../components';
import { Col, Row, Button, Space, Typography, Table } from 'antd';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { getDatos } from '../helpers';
//import { ResumeReport } from '../components/ResumeReport';
//import SecondTableReport from '../components/SecondTableReport';
import TableVMax from '../components/maxValue';
import TableVMin from '../components/SecondTableReport';



const { Title } = Typography;


export const Report: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {

  }, []);

  const HandleParameters = async (fechas:string[], estacion:string[])=>{
    const queryResult = await getDatos(estacion,fechas)
    setData(queryResult)
  }
 

  
  console.log(setData);
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
        <br />
        <div style={{display:'flex'}}>
          <TableVMax data={data}></TableVMax>
          <TableVMin data={data}></TableVMin>
        </div>
        <br />
        <TableReport data={data}></TableReport>
        </div>
      </Col>
      <Col span={1}></Col>
    </Row>

  </>
)};

export default Report;
