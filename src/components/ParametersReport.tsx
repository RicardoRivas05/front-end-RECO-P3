 import React, { useEffect, useState } from 'react';
import { Card, Col, Row, DatePicker, Space, Select, Button, message } from 'antd';
import { FundTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { getSource } from '../helpers';

const { RangePicker } = DatePicker;
const { Option } = Select;
 
export const ParametersReport: React.FC = ({ handleParameters }: any) => {
  const [dataSource, setSource] = useState<any>();
  const [fechaInicio, setFechaInicio] = useState<moment.Moment | null>(null);
  const [fechaFin, setFechaFin] = useState<moment.Moment | null>(null);
  const [estaciones, setEstaciones] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCustomRangeDisabled, setIsCustomRangeDisabled] = useState(false);

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

    if (dates[0] && dates[1]) {
      setIsCustomRangeDisabled(true);
      setIsButtonDisabled(estaciones.length === 0);
      setSelectedRange('');
    } else {
      setIsCustomRangeDisabled(false);
      setIsButtonDisabled(selectedRange === '' && estaciones.length === 0);
    }
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
      const today = moment().startOf('day');
      let startDate;
      let endDate;
  
      switch (selectedRange) {
        case '1':
          startDate = today.subtract(1, 'day');
          endDate = today;
          break;
        case '3':
          startDate = today.subtract(3, 'day');
          endDate = today;
          break;
        case '7':
          startDate = today.subtract(1, 'week');
          endDate = today;
          break;
        case '14':
          startDate = today.subtract(2, 'week');
          endDate = today;
          break;
        case '30':
          startDate = today.subtract(1, 'month');
          endDate = today;
          break;
        default:
          startDate = null;
          endDate = null;
      }
  
      handleParameters([startDate, endDate], estaciones);
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
                  showTime={false}
                  format="YYYY-MM-DD"
                  onChange={onChange}
                  disabled={!!selectedRange}
                />
              </Space>
            </Col>
            <Col span={10}>
              <Select
                mode="multiple"
                allowClear
                style= {{ width: '90%' }}
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



// import React, { useEffect, useState } from 'react';
// import { Card, Col, Row, DatePicker, Space, Select, Button, message } from 'antd';
// import { FundTwoTone } from '@ant-design/icons';
// import moment from 'moment';
// import { getSource } from '../helpers';

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// export const ParametersReport: React.FC = ({ handleParameters }: any) => {
//   const [dataSource, setSource] = useState<any>();
//   const [fechaInicio, setFechaInicio] = useState<moment.Moment | null>(null);
//   const [fechaFin, setFechaFin] = useState<moment.Moment | null>(null);
//   const [estaciones, setEstaciones] = useState<string[]>([]);
//   const [selectedRange, setSelectedRange] = useState<string>('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

//   // ...
//   const onChange = (dates: [moment.Moment | null, moment.Moment | null], dateStrings: [string, string]) => {
//     setFechaInicio(dates[0]);
//     setFechaFin(dates[1]);
//     setIsButtonDisabled(!isRangeSelected(selectedRange) && (!dates[0] || !dates[1]) || estaciones.length === 0);
//   };
  
//   const handleSelectedRange = (value: string) => {
//     setSelectedRange(value);
//     setIsButtonDisabled((!isRangeSelected(value) || !isRangeSelected([fechaInicio, fechaFin])) && estaciones.length === 0);
//     if (value) {
//       setFechaInicio(null);
//       setFechaFin(null);
//     }
//   };
  
//   const handleEstacionesChange = (selectedEstaciones: string[]) => {
//     setEstaciones(selectedEstaciones);
//     setIsButtonDisabled((!isRangeSelected(selectedRange) || !isRangeSelected([fechaInicio, fechaFin])) && selectedEstaciones.length === 0);
//   };

//   // ...
//   const isRangeSelected = (range: string | [moment.Moment | null, moment.Moment | null]) => {
//     if (typeof range === 'string') {
//       return range !== '';
//     } else {
//       return range[0] !== null || range[1] !== null;
//     }
//   };

// // ...

//   const handleGenerateReport = () => {
//     if ((!fechaInicio || !fechaFin) && !selectedRange) {
//       message.error('Por favor, complete el rango de fecha.');
//       return;
//     }

//     if (estaciones.length === 0) {
//       message.error('Por favor, seleccione al menos una estación.');
//       return;
//     }

//     if (selectedRange) {
//       handleParameters([], estaciones); // Pasar un arreglo vacío para indicar que se utilizará el rango predefinido
//     } else {
//       const fechaInicioString = fechaInicio ? fechaInicio.format('YYYY-MM-DD') : '';
//       const fechaFinString = fechaFin ? fechaFin.format('YYYY-MM-DD') : '';
//       handleParameters([fechaInicioString, fechaFinString], estaciones);
//     }
//   };

//   return (
//     <Row>
//       <Col span={1}></Col>
//       <Col span={22}>
//         <Card
//           title="Seleccionar Parámetros"
//           bordered={true}
//           hoverable={true}
//           style={{ border: '1px solid Gainsboro' }}
//         >
//           <Row>
//             <Col span={10}>
//               <Space direction="vertical" size={12}>
//                 <RangePicker
//                   format="YYYY-MM-DD"
//                   onChange={onChange}
//                   disabled={!!selectedRange}
//                   showTime={false}
//                 />
//               </Space>
//             </Col>
//             <Col span={10}>
//               <Select
//                 mode="multiple"
//                 allowClear
//                 style={{ width: '90%' }}
//                 placeholder="Seleccionar estaciones"
//                 onChange={handleEstacionesChange}
//                 options={dataSource}
//               />
//             </Col>
//             <Col span={3}>
//               <Button
//                 type="primary"
//                 shape="round"
//                 icon={<FundTwoTone />}
//                 size="middle"
//                 onClick={handleGenerateReport}
//                 disabled={isButtonDisabled}
//               >
//                 Generar Reporte
//               </Button>
//             </Col>
//           </Row>
//           <Row style={{ marginTop: '10px' }}>
//             <Col span={10}>
//               <Select
//                 style={{ width: '60%' }}
//                 placeholder="Seleccionar rango predefinido"
//                 onChange={handleSelectedRange}
//                 value={selectedRange}
//               >
//                 <Option value="">Seleccionar rango predefinido</Option>
//                 <Option value="1">1 día</Option>
//                 <Option value="3">3 días</Option>
//                 <Option value="7">1 semana</Option>
//                 <Option value="14">2 semanas</Option>
//                 <Option value="30">1 mes</Option>
//               </Select>
//             </Col>
//           </Row>
//         </Card>
//       </Col>
//       <Col span={1}></Col>
//     </Row>
//   );
// };

// export default ParametersReport;


