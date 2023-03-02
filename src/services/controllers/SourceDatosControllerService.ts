/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Datos } from '../models/Datos';
import type { DatosPartial } from '../models/DatosPartial';
import type { loopback_Count } from '../models/loopback_Count';
import type { NewDatosInSource } from '../models/NewDatosInSource';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SourceDatosControllerService {

    /**
     * @param id 
     * @param requestBody 
     * @returns Datos Source model instance
     * @throws ApiError
     */
    public static sourceDatosControllerCreate(
id: string,
requestBody?: NewDatosInSource,
): CancelablePromise<Datos> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sources/{id}/datos',
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
     * @returns loopback_Count Source.Datos PATCH success count
     * @throws ApiError
     */
    public static sourceDatosControllerPatch(
id: string,
where?: any,
requestBody?: DatosPartial,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/sources/{id}/datos',
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
     * @returns Datos Array of Source has many Datos
     * @throws ApiError
     */
    public static sourceDatosControllerFind(
id: string,
filter?: any,
): CancelablePromise<Array<Datos>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sources/{id}/datos',
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
     * @returns loopback_Count Source.Datos DELETE success count
     * @throws ApiError
     */
    public static sourceDatosControllerDelete(
id: string,
where?: any,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/sources/{id}/datos',
            path: {
                'id': id,
            },
            query: {
                'where': where,
            },
        });
    }

}
