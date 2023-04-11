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
      message.success('Create success!')
    })
    .catch((error) => {
      message.error('Create failed!');
    });
  }