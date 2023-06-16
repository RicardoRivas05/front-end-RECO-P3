import React from 'react';
import { Button, Result, Image, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { EllipsisOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const Start: React.FC = () => (
  <Result
  icon={<EllipsisOutlined style={{ color: '#FFFFFF' }} />}
    extra={[
      <Image
        key="image"
        width={320}
        //src="https://www.recoroatan.com/wp-content/uploads/2021/05/Reco-Esp_01.png"
        src='../img/Reco-Esp_01.png'
        style={{
          borderTopLeftRadius: '20%',
          borderBottomRightRadius: '20%',
          borderTopRightRadius: '20%',
          borderBottomLeftRadius: '20%',
        }}
      />,
      <Image
        key="image"
        width={420}
        src='../img/Logo TWE BMP.bmp'
        style={{
          borderTopLeftRadius: '20%',
          borderBottomRightRadius: '20%',
          borderTopRightRadius: '20%',
          borderBottomLeftRadius: '20%',
        }}
      />,
      <div key="content">
      <Title level={2} style={{ 
          marginTop:'30px',
          color: '#73d13d', 
          fontWeight: 'bold', 
          fontFamily: 'Mistral',
          textTransform: 'uppercase',
      }}>
      Historización y Reporte de Variables de Velocidad del Viento
      </Title>

      </div>,
    ]}
  />
);

export default Start;