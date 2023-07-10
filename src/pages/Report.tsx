import React, { useEffect, useState } from 'react';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Result, Row, Space, Typography } from 'antd';
import { GraphicReport, TableReport, ParametersReport } from '../components';
import { getDatos, getMinValueByStation } from '../helpers';
import { getMaxValueByStation } from '../helpers';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import Promedio from '../components/Promedio';
import TableVMax from '../components/maxValue';
import TableVMin from '../components/SecondTableReport';
import ReactLoading from 'react-loading';
import LineChart from '../components/LineChart';
import moment from 'moment';
import Consulta, {DatosTabla} from '../components/Consulta';
import TableVMinHist, { DatosTabla2 } from '../components/ConsultaValorBajo';


const { Title } = Typography;

const formatDate = (dateTime: string) => {
  const date = dayjs(dateTime);
  return date.format('YYYY-MM-DD HH:mm:ss');
};

const stationsNames = {
  "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
  "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
  "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
  "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
  "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
  "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
};

const transformDataForExport = (data: any[]) => {
  const transformedData = data.map(item => ({
    sourceId: stationsNames[item.sourceId] || item.sourceId,
    value: item.value,
    dateTime: formatDate(item.dateTime),
  }));

  return transformedData;
};

export const Report: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedStations, setSelectedStations] = useState<any[]>([]);
  const [consultaData, setConsultaData] = useState<DatosTabla[]>([]);
  const [consultaVMin, setconsultaVMin] = useState<DatosTabla2[]>([]);



  const handleParameters = async (fechas: string[], estacion: string[]) => {
  try {
    setIsLoading(true);
    setData([]);
    setSelectedStations(estacion);

    const startDateTime = moment(fechas[0]).startOf('day').format('YYYY-MM-DD HH:mm');
    const endDateTime = moment(fechas[1]).endOf('day').format('YYYY-MM-DD HH:mm');

    // Realizar el filtrado de los datos dentro del rango de fechas seleccionado
    const filteredData = await getDatos(estacion, [startDateTime, endDateTime]);

    // Ordenar los datos por fecha ascendente
    const sortedData = filteredData.sort((a, b) => moment(a.dateTime).diff(moment(b.dateTime)));

    setData(sortedData);

     // Obtener el valor máximo para la estación seleccionada
    const maxValueData = await getMaxValueByStation(estacion); // Pasar estacion como un array

    setConsultaData(maxValueData);

    //Obtener el valor minima para la estacion seleccionada
    const minValueData = await getMinValueByStation(estacion);
    setconsultaVMin(minValueData);
  } catch (error) {
    console.error('Error al obtener los datos: ', error);
  } finally {
    setIsLoading(false);
  }
};


  const exportToExcel = async (data: any[], sheetName: string) => {
    const transformedData = transformDataForExport(data);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = [
      { header: 'Source ID', key: 'sourceId' },
      { header: 'Value', key: 'value' },
      { header: 'Date/Time', key: 'dateTime' },
    ];

    transformedData.forEach((item: any) => {
      worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const filename = 'Reporte.xlsx';

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'cornflowerblue', fontFamily: 'Arial', fontSize: '30px' }}>
          <div style={{ marginRight: '10px' }}>Generando Reporte...</div>
          <ReactLoading type='spin' color='#0373FF' height={50} width={50} />
        </div>
      ) : (
        <>
          <ParametersReport handleParameters={handleParameters} />
          <br />
          <Row gutter={16}>
            <Col span={1}></Col>
            <Col span={22}>
              <Space wrap>
                <br />
                <Button
                  type="primary"
                  shape="round"
                  style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                  onClick={() => exportToExcel(data, 'Reporte')}
                >
                  <DownloadOutlined /> Exportar
                </Button>
              </Space>
              <br />
              <div className="print">
                <Title style={{ textAlign: 'center', fontWeight: 'bold', color: 'cornflowerblue', fontFamily: 'Arial' }}>
                  Reporte de Estaciones
                </Title>
                
                <br />
                <br />
                <LineChart data={data} selectedStations={selectedStations}/>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TableVMax data={data} selectedStations={selectedStations}/>
                  <TableVMin data={data} selectedStations={selectedStations} />
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Promedio data={data} />                  
                  <Consulta datos={consultaData}/>
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <TableVMinHist datos={consultaVMin}/>
                </div>
                <br />
                <TableReport data={data} />
              </div>
            </Col>
            <Col span={1}></Col>
          </Row>
        </>
      )}
    </>
  );
};
