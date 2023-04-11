import {QuantityControllerService} from '../services'

export const getQuantity = async () =>{
    const data = await
        QuantityControllerService
            .quantityControllerFind(
                `{"where":{"status": true}}`
            );
    return data;
}