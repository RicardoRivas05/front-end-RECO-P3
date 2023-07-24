import React, { useEffect, useState, useMemo } from 'react';
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
    return (dateTime: string) => {
      const date = dayjs(dateTime);
      return date.format('YYYY-MM-DD HH:mm:ss');
    };
  }, []);

  // Filtrar los datos para eliminar duplicados
  const filteredData = useMemo(() => {
    const uniqueCombos = new Set<string>();
    return data.filter((item) => {
      const combo = `${item.sourceId}-${formatDate(item.dateTime)}`;
      if (!uniqueCombos.has(combo)) {
        uniqueCombos.add(combo);
        return true;
      }
      return false;
    });
  }, [data]);

  // Ordenar los datos por fecha y hora de forma ascendente
  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return dateA - dateB;
    });
  }, [filteredData]);

  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatValue = (value: number) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  };

  const columns: ColumnsType<TableItem> = [
    {
      title: 'Fecha',
      dataIndex: 'dateTime',
      render: (_, { dateTime }) => <>{formatDate(dateTime)}</>,
    },
    {
      title: 'Estación',
      dataIndex: 'sourceId',
      render: (sourceId) => idNames[sourceId] || sourceId,
    },
    {
      title: 'Velocidad (mi/h)',
      dataIndex: 'value',
      render: (value) => formatValue(value),
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
              total: sortedData.length,
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