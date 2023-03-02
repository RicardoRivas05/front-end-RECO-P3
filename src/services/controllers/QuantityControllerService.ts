/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loopback_Count } from '../models/loopback_Count';
import type { NewQuantity } from '../models/NewQuantity';
import type { Quantity } from '../models/Quantity';
import type { QuantityPartial } from '../models/QuantityPartial';
import type { QuantityWithRelations } from '../models/QuantityWithRelations';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuantityControllerService {

    /**
     * @param where 
     * @returns loopback_Count Quantity model count
     * @throws ApiError
     */
    public static quantityControllerCount(
where?: any,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quantities/count',
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
    public static quantityControllerReplaceById(
id: string,
requestBody?: Quantity,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/quantities/{id}',
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
    public static quantityControllerUpdateById(
id: string,
requestBody?: QuantityPartial,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/quantities/{id}',
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
     * @returns QuantityWithRelations Quantity model instance
     * @throws ApiError
     */
    public static quantityControllerFindById(
id: string,
filter?: any,
): CancelablePromise<QuantityWithRelations> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quantities/{id}',
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
    public static quantityControllerDeleteById(
id: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/quantities/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns Quantity Quantity model instance
     * @throws ApiError
     */
    public static quantityControllerCreate(
requestBody?: NewQuantity,
): CancelablePromise<Quantity> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quantities',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param where 
     * @param requestBody 
     * @returns loopback_Count Quantity PATCH success count
     * @throws ApiError
     */
    public static quantityControllerUpdateAll(
where?: any,
requestBody?: QuantityPartial,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/quantities',
            query: {
                'where': where,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param filter 
     * @returns QuantityWithRelations Array of Quantity model instances
     * @throws ApiError
     */
    public static quantityControllerFind(
filter?: any,
): CancelablePromise<Array<QuantityWithRelations>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quantities',
            query: {
                'filter': filter,
            },
        });
    }

}
