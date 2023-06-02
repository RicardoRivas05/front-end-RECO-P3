import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';

type DataItem = {
  dateTime: string;
  value: number;
  sourceId: string;
};

type Props = {
  data: DataItem[];
};

export const GraphicReport: React.FC<Props> = ({ data }) => {
  const idNames: { [key: string]: string } = {
    "645e79a1ac39284b585fb464": "S1 WIND SPEED SCALED",
    "645e79a6ac39284b585fb465": "S2 WIND SPEED SCALED",
    "645e9a7bac39284b585fb469": "S3 WIND SPEED SCALED",
    "645e9a8eac39284b585fb46a": "S4 WIND SPEED SCALED",
    "645e9a93ac39284b585fb46b": "S5 WIND SPEED SCALED",
    "645e9a98ac39284b585fb46c": "S6 WIND SPEED SCALED",
  };

  const sortedData = data.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const config = {
    data: sortedData,
    xField: 'dateTime',
    yField: 'value',
    seriesField: 'sourceId',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        const { dateTime, sourceId, value } = datum;
        const nameToShow = idNames[sourceId] || sourceId;
        return {
          name: nameToShow,
          value,
          title: dateTime,
        };
      },
    },
    annotations:[
      {
        type: 'point',
        position: [data.reduce((max, d) => (d.value > max ? d.value : max), -Infinity)],
        style:{
          stroke: 'red',
          lineWidth: 2,
        },
        text:{
          content: 'Highest',
          offsetY: -10,
        },
      },
    ],
  };

  return <Line {...config} />;
};

export default GraphicReport;
