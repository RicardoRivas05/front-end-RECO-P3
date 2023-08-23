import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { getQuantity, getSource, postDatosBatch } from '../helpers';
import dayjs from 'dayjs';

interface CsvData {
  Date: string;
  [key: string]: string | number;
}

const parseCsvData = (data: CsvData[], dataSource: any[], dataQuantity: any[]) => {
  const newData: any[] = [];

  data.forEach(obj => {
    const arr = Object.keys(obj).map((key) => ({key, value: obj[key]}));

    arr.forEach(item => {
      if (item.key !== 'Date' && dataSource && dataQuantity) {
        const source = dataSource.find((s: any) =>{
          const matchResult = item.key.match(/[0-9]+/g);
          return matchResult && s.name.match(/[0-9]+/g)[0] === matchResult[0];
        });

        if (source) {
          newData.push({
            dateTime: dayjs(obj.Date).toISOString(),
            sourceId: source.id,
            quantityId: dataQuantity[0].id,
            value: item.value,
          });
        }
      }
    });
  });

  console.log(newData)

  return newData;
}


export const Form = () => {
  const [jsonData, setJsonData] = useState<CsvData[]>([]);
  const [dataSource, setSource] = useState<any>();
  const [dataQuantity, setQuantity] = useState<any>();
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const[isInsertingData, setIsInsertingData] = useState(false);

  const handleCsvLoad = async (csvData: CsvData[]) => {
    setLoading(true);
    try {
      console.log(csvData);
      await HandleSource();
      const dataQuantityResponse = await HandleQuantity();
      
      if (dataQuantityResponse) {
        setQuantity(dataQuantityResponse);
        console.log(dataSource, dataQuantityResponse);
        const newData = parseCsvData(csvData, dataSource, dataQuantityResponse);
        postCsvData(newData);
      } else {
        setError('La respuesta de la cantidad de datos es inválida.');
      }
    } catch (error) {
      setError('Error al cargar y procesar el archivo CSV');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  const handleCsvLoadError = (error: any) => setError('Error al cargar el archivo CSV');

  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file)
      parseCsv(file, handleCsvLoad, { error: handleCsvLoadError });
  }

  const postCsvData =async (newData:any[]) => {
    console.log('postCsvData triggered')
    setIsInsertingData(true)
    try {
      setLoading(true)
      await postDatosBatch(newData, 500);
      console.log('Datos insertados exitosamente')      
    } catch (error) {
        console.error('Error al insertar los datos')
    }finally{
      setIsInsertingData(false)
      setLoading(false)
    }
  }


  const HandleSource = async () => {
    try {
      setLoading(true);
      const data = await getSource();
      setSource(data);
    } catch (error) {
      setError('Error al obtener los datos de origen');
    } finally {
      setLoading(false);
    }
  }

  const HandleQuantity = async () => {
    try {
      setLoading(true);
      const data = await getQuantity();
      return data
    } catch (error) {
      setError('Error al obtener la cantidad de datos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('DataSource', dataSource)
    console.log('DataQuantity', dataQuantity)
    HandleSource();
    HandleQuantity().then(data=>setQuantity(data));
  }, []);


  const parseCsv = (csvFile: File, callback: (jsonData: CsvData[]) => void, options = {}) =>
  Papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    ...options,
    complete:(results:any) =>{
      const jsonData = results.data as CsvData[];
      callback(jsonData)
    }
  })
    
  return (
    <>
      <h1 style={{ fontSize: "50px", textAlign: "center", fontWeight: 'bold', color: 'cornflowerblue', fontFamily: 'Arial' }}>Ingreso de datos</h1>
      <h2 style={{ textAlign: "center" }}>Selecciona y carga el archivo en formato .txt en el siguiente espacio: </h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <input style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: '20px' }} type="file" onChange={handleCsvFileChange} />
      {isLoading || isInsertingData ? (
        <p style={{ textAlign: 'center' }}>
          Insertando Datos...</p>
      ) : (
        isLoading ? (
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
        )
      )}
    </>
  );
  

};

export default Form;

