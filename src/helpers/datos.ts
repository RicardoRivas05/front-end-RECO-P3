import {DatosControllerService, NewDatos} from '../services'
import { message } from "antd";
import { DatosTabla } from '../components/Consulta';
import { DatosTabla2 } from '../components/ConsultaValorBajo';

export const getDatos = async (sourceId:string[],dateTime:string[]) =>{
    const data = await
        DatosControllerService
            .datosControllerFind(
                `{
                    "where": {
                        "and": [
                            {
                                "sourceId": {
                                    "inq": ${JSON.stringify(sourceId)}
                                }
                            },                            
                            {
                                "dateTime": {
                                    "between": ${JSON.stringify(dateTime)}
                                }
                            }
                        ]
                    }
                }`
            );
    return data;
}

export const getMaxValueByStation = async (stationIds: string[]): Promise<DatosTabla[]> => {
    try {
      const promises = stationIds.map(async (stationId) => {
        const data = await DatosControllerService.datosControllerFind({
          where: {
            sourceId: stationId
          },
          order: 'value DESC',
          limit: 1
        });
  
        if (data.length > 0) {
          const maxValue = data[0].value;
          const stationId = data[0].sourceId;
          const date = data[0].dateTime;
  
          return {
            maxValue: maxValue,
            stationId: stationId,
            date: date
          };
        }
  
        return null; // No se encontraron registros para la estación seleccionada
      });
  
      const results = await Promise.all(promises);
  
      return results.filter((result) => result !== null) as DatosTabla[];
    } catch (error) {
      console.error('Error al obtener los valores máximos: ', error);
      return [];
    }
  };
  
  export const getMinValueByStation = async (stationIds: string[]): Promise<DatosTabla2[]> => {
    try {
      const promises = stationIds.map(async (stationId) => {
        const data = await DatosControllerService.datosControllerFind({
          where: {
            sourceId: stationId
          },
          order: 'value ASC', // Ordenar por valor mínimo y fecha descendente
          limit: 1
        });
  
        if (data.length > 0) {
          const minValue = data[0].value;
          const sourceId = data[0].sourceId;
          const date = data[0].dateTime;
  
          if (minValue !== undefined && sourceId !== undefined) {
            return {
              minValue: minValue,
              stationId: sourceId,
              date: date
            };
          }
        }
  
        return null;
      });
  
      const results = await Promise.all(promises);
  
      return results.filter((result) => result !== null) as DatosTabla2[];
    } catch (error) {
      console.error('Error al obtener los valores mínimos: ', error);
      return [];
    }
  };
  
    
  
  
  


export const postDatos = async(data:any[]) =>{

    if(!Array.isArray(data)){
        console.error('Error: data is nor an array');
        return;
    }

    const newData: NewDatos[] = data.map((item) => {
        return {
            dateTime: item.dateTime,
            sourceId: item.sourceId,
            quantityId: item.quantityId,
            value: item.value,
        };
    });

    message.loading({content: 'Loading data!', key:'loading', duration: 0}) //Esto mostrara el Mensaje de carga

    try {
        await Promise.all(newData.map((item) => DatosControllerService.datosControllerCreate(item)));

        message.success({content: 'Data loaded!', key:'loading'});
    } catch (error) {
        console.error('Error al insertar los datos: ', error);
        message.error({content: 'Error loading data!', key:'loading'})      
    }
};
