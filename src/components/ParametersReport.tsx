import React, { useEffect, useState } from 'react';
import { Card, Col, Row, DatePicker, Space, Select, Button, message } from 'antd';
import { FundTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { getSource } from '../helpers';

const { RangePicker } = DatePicker;

export const ParametersReport: React.FC = ({ handleParameters }: any) => {
  const [dataSource, setSource] = useState<any>();
  const [fechaInicio, setFechaInicio] = useState<moment.Moment | null>(null);
  const [fechaFin, setFechaFin] = useState<moment.Moment | null>(null);
  const [estaciones, setEstaciones] = useState<any>('');

  const HandleSource = async () => {
    const getData = await getSource();
    const list = getData.map((item) => {
      return { label: item.name, value: item.id };
    });
    setSource(list);
  };

  useEffect(() => {
    HandleSource();
  }, []);

  const onChange = (dates: [moment.Moment | null, moment.Moment | null], dateStrings: [string, string]) => {
    setFechaInicio(dates[0]);
    setFechaFin(dates[1]);
  };

  const handleGenerateReport = () => {
    if (!fechaInicio || !fechaFin || !estaciones) {
      message.error('Por favor, complete el rango de fecha, las estaciones y la hora.');
      return;
    }

    const fechaInicioString = fechaInicio.format('YYYY-MM-DD');
    const fechaFinString = fechaFin.format('YYYY-MM-DD');

    handleParameters([fechaInicioString, fechaFinString], estaciones);
  };

  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <Card
          title="Seleccionar Parámetros"
          bordered={true}
          hoverable={true}
          style={{ border: '1px solid Gainsboro' }}
        >
          <Row>
            <Col span={10}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD"
                  onChange={onChange}
                />
              </Space>
            </Col>
            <Col span={10}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '90%' }}
                placeholder="Seleccionar estaciones"
                onChange={setEstaciones}
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
              >
                Generar Reporte
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={1}></Col>
    </Row>
  );
};

export default ParametersReport;

// import React, { useEffect, useState } from 'react';
// import { Card, Col, Row, DatePicker, Space, Select, Button, message } from 'antd';
// import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
// import { FundTwoTone } from '@ant-design/icons';
// import { getSource } from '../helpers';

// const { RangePicker } = DatePicker;

// export const ParametersReport: React.FC = ({ handleParameters }: any) => {
//   const [dataSource, setSource] = useState<any>();
//   const [fechas, setFechas] = useState<any>([]);
//   const [estaciones, setEstaciones] = useState<any>('');

//   const HandleSource = async () => {
//     const getData = await getSource();
//     const list = getData.map((item) => {
//       return { label: item.name, value: item.id };
//     });
//     setSource(list);
//   };

//   useEffect(() => {
//     HandleSource();
//   }, []);

//   const onChange = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: [string, string]) => {
//     setFechas(dateString);
//   };

//   const onClickGenerarReporte = () => {
//     if (fechas.length === 0 || estaciones.length === 0) {
//       message.error('Por favor, complete todos los campos');
//       return;
//     }
//     handleParameters(fechas, estaciones);
//   };

//   return (
//     <Row>
//       <Col span={1}></Col>
//       <Col span={22}>
//         <Card title="Seleccionar Parámetros" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
//           <Row>
//             <Col span={10}>
//               <Space direction="vertical" size={12}>
//                 <RangePicker
//                   showTime={{ format: 'HH:mm:ss' }}
//                   format="YYYY-MM-DD HH:mm:ss"
//                   onChange={onChange}
//                 />
//               </Space>
//             </Col>
//             <Col span={10}>
//               <Select
//                 mode="multiple"
//                 allowClear
//                 style={{ width: '90%' }}
//                 placeholder="Seleccionar estaciones "
//                 onChange={setEstaciones}
//                 options={dataSource}
//               />
//             </Col>
//             <Col span={3}>
//               <Button
//                 type="primary"
//                 shape="round"
//                 icon={<FundTwoTone />}
//                 size="middle"
//                 onClick={onClickGenerarReporte}
//               >
//                 Generar Reporte
//               </Button>
//             </Col>
//           </Row>
//         </Card>
//       </Col>
//       <Col span={1}></Col>
//     </Row>
//   );
// };

// export default ParametersReport;

// // import React, { useEffect, useState } from 'react';
// // import { Card, Col, Row, DatePicker, Space, Select, Button } from 'antd';
// // import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
// // import { FundTwoTone } from '@ant-design/icons';
// // import {  getSource } from '../helpers';

// // const { RangePicker } = DatePicker;

// // export const ParametersReport: React.FC = ({handleParameters}:any) => {
// //   const [dataSource, setSource] = useState<any>();
// //   const [fechas,setFechas] = useState<any>([]);
// //   const [estaciones,setEstaciones] = useState<any>('');

// //   const HandleSource = async () => {
// //     const getData = await getSource()
// //     const list = getData.map((item) => {
// //       return { "label": item.name, "value": item.id }
// //     })
// //     setSource(list)
// //   }
// //   useEffect(() => {
// //     HandleSource()
// //   }, []);

// //   const onChange = (
// //     value: DatePickerProps['value'] | RangePickerProps['value'],
// //     dateString: [string, string],
// //   ) => {
// //     setFechas(dateString)
// //   };

// //   const onOk =(value:DatePickerProps['value'] | RangePickerProps['value'])=>{
// //     console.log('onOk: ', value);
// //   };

// //   return (
// //     <Row>
// //       <Col span={1}></Col>
// //       <Col span={22}>
// //         <Card title="Seleccionar Parametros" bordered={true} hoverable={true} style={{ border: '1px solid Gainsboro' }}>
// //           <Row>
// //             <Col span={10}>
// //             <Space direction="vertical" size={12}>
// //                 <RangePicker
// //                   // showTime={{ format: 'HH:mm' }}
// //                   format="YYYY-MM-DD"
// //                   onChange={onChange}
// //                   onOk={onOk}
// //                 />
// //               </Space>
// //             </Col>
// //             <Col span={10}>
// //               <Select
// //                 mode="multiple"
// //                 allowClear
// //                 style={{ width: '90%' }}
// //                 placeholder="Seleccionar estaciones "
// //                 onChange={setEstaciones}
// //                 options={dataSource}
// //               />
// //             </Col>
// //             <Col span={3}>
// //               <Button type="primary" shape="round" icon={<FundTwoTone />} size="middle" 
// //               onClick={()=>{
// //                 handleParameters(fechas,estaciones)
// //               }} 
// //               >
// //                 Generar Reporte
// //               </Button>
// //             </Col>
// //           </Row>
// //         </Card>
// //       </Col>
// //       <Col span={1}></Col>
// //     </Row>
// //   )
// // };

// // export default ParametersReport;