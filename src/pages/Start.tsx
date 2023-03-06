import React from 'react';
import { Image } from 'antd';
import { Col, Row } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

export const Start: React.FC = () => (
  <>
  <Row>
    <Col span={8}>
    <Image 
    width={450} 
    src="https://www.recoroatan.com/wp-content/uploads/2021/05/Reco-Esp_01.png" 
    style={{ 
      borderTopLeftRadius: '20%',
      borderBottomRightRadius: '20%',
      borderTopRightRadius: '20%',
      borderBottomLeftRadius: '20%'
    }} 
  />
    </Col>
    <Col span={14}>
        <Title style={{ textAlign: 'center', fontWeight: 'bold', color:'cornflowerblue' }}>¡Bienvenidos!</Title>
        <Title level={2} style={{ textAlign: 'center', fontWeight: 'bold', color:'cornflowerblue', fontFamily: 'Arial', fontStyle: 'italic' }}>Historización y Reporte de Variables de Velocidad del Viento</Title>
    </Col>
    <Col span={2}>

    </Col>

    </Row>
  </>
);

export default Start;