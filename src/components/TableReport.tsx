import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Table, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';

interface TableItem {
  id: React.Key;
  sourceId: string;
  dateTime: string;
  value: number[];
}

interface TableProps {
  data: TableItem[];
}

export const TableReport: React.FC<TableProps> = ({ data }) => {
  const [idNames, setIdNames] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // Número de registros por página

  useEffect(() => {
    const idNamesResponse: { [key: string]: string } = {
      "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
      "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
      "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
      "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
      "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
      "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
    };
    setIdNames(idNamesResponse);
  }, []);

  const formatDate = useMemo(() => {
    return (dateTime: string) =>{
      const date = dayjs(dateTime);
      return date.format('YYYY-MM-DD HH:mm:ss');
    }
  }, []);


  const filteredData: TableItem[] =[];
  const uniqueCombos = new Set<string>();

  for(const item of data){
    const combo = `${item.sourceId}-${formatDate(item.dateTime)}`;
    if(!uniqueCombos.has(combo)){
      filteredData.push(item);
      uniqueCombos.add(combo);
    }
  }



  const paginatedData = filteredData.slice((currentPage-1) * pageSize, currentPage * pageSize);

  const columns: ColumnsType<TableItem> = [
    {
      title: 'Fecha',
      dataIndex: 'dateTime',
      render: (_, { dateTime }) => <>{formatDate(dateTime)}</>,
    },
    {
      title: 'Id',
      dataIndex: 'sourceId',
      render: (sourceId) => idNames[sourceId] || sourceId,
    },
    {
      title: 'Velocidad (mi/h)',
      dataIndex: 'value',
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            style={{ width: '90%', margin: 'auto' }}
            columns={columns}
            dataSource={paginatedData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData.length,
              onChange: (page) => setCurrentPage(page),
            }}
            size="middle"
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  );
};



// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import { Table, Spin } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import { Col, Row } from 'antd';
// import dayjs from 'dayjs';

// interface TableItem {
//   id: React.Key;
//   sourceId: string;
//   dateTime: string;
//   value: number[];
// }

// interface TableProps {
//   data: TableItem[];
// }

// export const TableReport: React.FC<TableProps> = ({ data }) => {
//   const [idNames, setIdNames] = useState<{ [key: string]: string }>({});
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const pageSize = 10; // Número de registros por página

//   useEffect(() => {
//     const idNamesResponse: { [key: string]: string } = {
//       "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
//       "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
//       "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
//       "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
//       "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
//       "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
//     };
//     setIdNames(idNamesResponse);
//   }, []);

//   const formatDate = useMemo(() => {
//     return (dateTime: string) =>{
//       const date = dayjs(dateTime);
//       return date.format('YYYY-MM-DD HH:mm:ss');
//     }
//   }, []);


//   const filteredData = useMemo(() => {
//     const filtered = data.reduce((accumulator: TableItem[], item: TableItem) => {
//       const existingItem = accumulator.find(
//         (accItem) =>
//           accItem.sourceId === item.sourceId && formatDate(accItem.dateTime) === formatDate(item.dateTime)
//       );
//       if (!existingItem) {
//         accumulator.push(item);
//       }
//       return accumulator;
//     }, []);

//     return filtered;
//   }, [data]);

//   const paginatedData= useMemo(()=>{
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     return filteredData.slice(startIndex, endIndex);
//   }, [currentPage, pageSize, filteredData])

//   const columns: ColumnsType<TableItem> = [
//     {
//       title: 'Fecha',
//       dataIndex: 'dateTime',
//       render: (_, { dateTime }) => <>{formatDate(dateTime)}</>,
//     },
//     {
//       title: 'Id',
//       dataIndex: 'sourceId',
//       render: (sourceId) => idNames[sourceId] || sourceId,
//     },
//     {
//       title: 'Velocidad (mi/h)',
//       dataIndex: 'value',
//     },
//   ];

//   return (
//     <>
//       <Row>
//         <Col span={24}>
//           <Table
//             style={{ width: '90%', margin: 'auto' }}
//             columns={columns}
//             dataSource={paginatedData}
//             pagination={{
//               current: currentPage,
//               pageSize: pageSize,
//               total: filteredData.length,
//               onChange: (page) => setCurrentPage(page),
//             }}
//             size="middle"
//             rowKey="id"
//           />
//         </Col>
//       </Row>
//     </>
//   );
// };