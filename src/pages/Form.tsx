import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { getQuantity, getSource, postDatos } from '../helpers';
import dayjs from 'dayjs'

interface CsvData {
  Date: string;
  "S1 WIND SPEED SCALED": number;
  "S2 WIND SPEED SCALED": number;
  "S3 WIND SPEED SCALED": number;
  "S4 WIND SPEED SCALED": number;
  "S5 WIND SPEED SCALED": number;
  "S6 WIND SPEED SCALED": number;
}

export const Form = () => {
  const [jsonData, setJsonData] = useState<CsvData[]>([]);
  const [dataSource, setSource] = useState<any>();
  const [dataQuantity, setQuantity] = useState<any>();

  const handleCsvLoad = (csvData: CsvData[]) => setJsonData(csvData);
  const handleCsvLoadError = (error: any) => console.error(error);

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file)
      parseCsv(file, handleCsvLoad, { error: handleCsvLoadError });
  }

  const HandleSource = async () => {
    const getData = await getSource()
    setSource(getData)
  }

  const HandleQuantity = async () => {
    const getData = await getQuantity()
    setQuantity(getData)
  }

  useEffect(() => {
    HandleSource()
    HandleQuantity()
  }, []);

  const parseCsv = (csvFile: File, callback: (jsonData: CsvData[]) => void, options = {}) =>
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      ...options,
      complete: (results: any) => {
        const jsonData = results.data as CsvData[];
        jsonData.map(obj => {
          const arr = Object.keys(obj).map((key) => ({ key, value: obj[key] }));
          arr.map(item => {
            if (item.key != 'Date')
              postDatos(
                {
                  "dateTime":
                    dayjs()
                      .set('hour', Number(obj.Date.substring(0, 2)))
                      .set('minute', Number(obj.Date.substring(3, 5)))
                      .set('second', Number(obj.Date.substring(6, 8)))
                      .set('ms', 0)
                      .set('month', Number(obj.Date.substring(9, 11)) - 1)
                      .set('date', Number(obj.Date.substring(12, 14)))
                      .set('year', Number(obj.Date.substring(15, 19)))
                      .toISOString(),
                  "sourceId": dataSource.find((s: any) => s.name.match(/[0-9]+/g)[0] === item.key.match(/[0-9]+/g)[0]).id,
                  "quantityId": dataQuantity[0].id,
                  "value": item.value
                }
              )
          }
          )
        }
        )
        callback(jsonData);
      }
    });

  return (
    <>
      <h1>Ingreso de datos</h1>
      <input type="file" onChange={handleCsvFileChange} />
      <ul>
        {jsonData.map((item, index) => (
          <li key={index}>
            {item.Date}, {item['S1 WIND SPEED SCALED']}, {item['S2 WIND SPEED SCALED']}, {item['S3 WIND SPEED SCALED']}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Form;