/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Datos } from '../models/Datos';
import type { DatosPartial } from '../models/DatosPartial';
import type { loopback_Count } from '../models/loopback_Count';
import type { NewDatosInQuantity } from '../models/NewDatosInQuantity';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuantityDatosControllerService {

    /**
     * @param id 
     * @param requestBody 
     * @returns Datos Quantity model instance
     * @throws ApiError
     */
    public static quantityDatosControllerCreate(
id: string,
requestBody?: NewDatosInQuantity,
): CancelablePromise<Datos> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quantities/{id}/datos',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @param where 
     * @param requestBody 
     * @returns loopback_Count Quantity.Datos PATCH success count
     * @throws ApiError
     */
    public static quantityDatosControllerPatch(
id: string,
where?: any,
requestBody?: DatosPartial,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/quantities/{id}/datos',
            path: {
                'id': id,
            },
            query: {
                'where': where,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @param filter 
     * @returns Datos Array of Quantity has many Datos
     * @throws ApiError
     */
    public static quantityDatosControllerFind(
id: string,
filter?: any,
): CancelablePromise<Array<Datos>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quantities/{id}/datos',
            path: {
                'id': id,
            },
            query: {
                'filter': filter,
            },
        });
    }

    /**
     * @param id 
     * @param where 
     * @returns loopback_Count Quantity.Datos DELETE success count
     * @throws ApiError
     */
    public static quantityDatosControllerDelete(
id: string,
where?: any,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/quantities/{id}/datos',
            path: {
                'id': id,
            },
            query: {
                'where': where,
            },
        });
    }

}
