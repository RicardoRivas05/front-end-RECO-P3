/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Datos } from '../models/Datos';
import type { DatosPartial } from '../models/DatosPartial';
import type { DatosWithRelations } from '../models/DatosWithRelations';
import type { loopback_Count } from '../models/loopback_Count';
import type { NewDatos } from '../models/NewDatos';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DatosControllerService {

    /**
     * @param where 
     * @returns loopback_Count Datos model count
     * @throws ApiError
     */
    public static datosControllerCount(
where?: any,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datos/count',
            query: {
                'where': where,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static datosControllerReplaceById(
id: string,
requestBody?: Datos,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/datos/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static datosControllerUpdateById(
id: string,
requestBody?: DatosPartial,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/datos/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @param filter 
     * @returns DatosWithRelations Datos model instance
     * @throws ApiError
     */
    public static datosControllerFindById(
id: string,
filter?: any,
): CancelablePromise<DatosWithRelations> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datos/{id}',
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
     * @returns void 
     * @throws ApiError
     */
    public static datosControllerDeleteById(
id: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/datos/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns Datos Datos model instance
     * @throws ApiError
     */
    public static datosControllerCreate(
requestBody?: NewDatos,
): CancelablePromise<Datos> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/datos',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param where 
     * @param requestBody 
     * @returns loopback_Count Datos PATCH success count
     * @throws ApiError
     */
    public static datosControllerUpdateAll(
where?: any,
requestBody?: DatosPartial,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/datos',
            query: {
                'where': where,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param filter 
     * @returns DatosWithRelations Array of Datos model instances
     * @throws ApiError
     */
    public static datosControllerFind(
filter?: any,
): CancelablePromise<Array<DatosWithRelations>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datos',
            query: {
                'filter': filter,
            },
        });
    }

}
