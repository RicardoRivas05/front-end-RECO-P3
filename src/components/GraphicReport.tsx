import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/charts';
import ReactDOM from 'react-dom';

export const GraphicReport: React.FC = (data:any) => {
  const config = {
    data: data.data,
    xField: 'dateTime',
    yField: 'value',
    seriesField: 'sourceId',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        formatter: (v:any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return <Line {...config} />;
};

export default GraphicReport;