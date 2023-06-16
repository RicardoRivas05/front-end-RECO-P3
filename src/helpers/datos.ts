import {DatosControllerService, NewDatos} from '../services'
import { message } from "antd";

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


export const postDatos = (item:NewDatos):void =>{
    DatosControllerService.datosControllerCreate(item)
    .then((newData) => {        
        message.info('Cargando Datos, espere a que desaparezcan todos los mensajes de su pantalla')
    })
    .catch((error) => {
        message.loading('Loading data!')
    });
  }