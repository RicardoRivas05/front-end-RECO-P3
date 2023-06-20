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
        message.error({content: 'Errir loading data!', key:'loading'})      
    }
};

// Metodo funciona pero mas lento
// export const postDatos = (item:NewDatos):void =>{
//     DatosControllerService.datosControllerCreate(item)
//     .then((newData) => {        
//             return
//     })
//     .catch((error) => {
//         message.loading('Loading data!')
//     });
//   }