import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { getQuantity, getSource, postDatos } from '../helpers';
import dayjs from 'dayjs';

interface CsvData {
  Date: string;
  "S1 WIND SPEED SCALED": number;
  "S2 WIND SPEED SCALED": number;
  "S3 WIND SPEED SCALED": number;
  "S4 WIND SPEED SCALED": number;
  "S5 WIND SPEED SCALED": number;
  "S6 WIND SPEED SCALED": number;
  [key: string]: string | number;
}

export const Form = () => {
  const [jsonData, setJsonData] = useState<CsvData[]>([]);
  const [dataSource, setSource] = useState<any>();
  const [dataQuantity, setQuantity] = useState<any>();
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleCsvLoad = (csvData: CsvData[]) => setJsonData(csvData);
  const handleCsvLoadError = (error: any) => setError('Error al cargar el archivo CSV');

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file)
      parseCsv(file, handleCsvLoad, { error: handleCsvLoadError });
  }

  const HandleSource = async () => {
    try {
      setLoading(true);
      const getData = await getSource();
      setSource(getData);
    } catch (error) {
      setError('Error al obtener los datos de origen');
    } finally {
      setLoading(false);
    }
  }

  const HandleQuantity = async () => {
    try {
      setLoading(true);
      const getData = await getQuantity();
      setQuantity(getData);
    } catch (error) {
      setError('Error al obtener la cantidad de datos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    HandleSource();
    HandleQuantity();
  }, []);

  const parseCsv = (csvFile: File, callback: (jsonData: CsvData[]) => void, options = {}) =>
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      ...options,
      complete: (results: any) => {
        const jsonData = results.data as CsvData[];
        jsonData.forEach(obj => {
          const arr = Object.keys(obj).map((key) => ({ key, value: obj[key] }));
          arr.forEach(item => {
            if (item.key !== 'Date' && dataSource && dataQuantity) {
              const source = dataSource.find((s: any) => {
                const matchResult = item.key.match(/[0-9]+/g);
                return matchResult && s.name.match(/[0-9]+/g)[0] === matchResult[0];
              });
              if (source) {
                postDatos([
                  {
                    "dateTime": dayjs().set('hour', Number(obj.Date.substring(0, 2))).set('minute', Number(obj.Date.substring(3, 5))).set('second', Number(obj.Date.substring(6, 8))).set('ms', 0).set('month', Number(obj.Date.substring(9, 11)) - 1).set('date', Number(obj.Date.substring(12, 14))).set('year', Number(obj.Date.substring(15, 19))).toISOString(),
                    "sourceId": source.id,
                    "quantityId": dataQuantity[0].id,
                    "value": item.value
                  }
                ]);
              }
            }
          });
        });
        callback(jsonData);
      }
    });

  return (
    <>
      <h1 style={{ fontSize: "50px", textAlign: "center", fontWeight: 'bold', color: 'cornflowerblue', fontFamily: 'Arial' }}>Ingreso de datos</h1>
      <h2 style={{ textAlign: "center" }}>Selecciona y carga el archivo en formato .txt en el siguiente espacio: </h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <input style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: '20px' }} type="file" onChange={handleCsvFileChange} />
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Cargando datos...</p>
      ) : (
        <>
          <div style={{ textAlign: 'center' }}>
            <ol className="list-group list-group-numbered" style={{ fontSize: '20px', margin: '0 auto' }}>
              {jsonData.map((item, index) => (
                <li key={index}>
                  {item.Date}, {item['S1 WIND SPEED SCALED']}, {item['S2 WIND SPEED SCALED']}, {item['S3 WIND SPEED SCALED']}, {item['S4 WIND SPEED SCALED']}, {item['S5 WIND SPEED SCALED']}, {item['S6 WIND SPEED SCALED']}
                </li>
              ))}
            </ol>
          </div>
          {jsonData.length > 0 && !error && <p style={{ textAlign: 'center' }}>Data loaded</p>}
        </>
      )}
    </>
  );
};

export default Form;