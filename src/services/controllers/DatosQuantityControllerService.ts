/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Quantity } from '../models/Quantity';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DatosQuantityControllerService {

    /**
     * @param id 
     * @returns Quantity Quantity belonging to Datos
     * @throws ApiError
     */
    public static datosQuantityControllerGetQuantity(
id: string,
): CancelablePromise<Array<Quantity>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datos/{id}/quantity',
            path: {
                'id': id,
            },
        });
    }

}
