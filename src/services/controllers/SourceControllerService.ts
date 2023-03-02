/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { loopback_Count } from '../models/loopback_Count';
import type { NewSource } from '../models/NewSource';
import type { Source } from '../models/Source';
import type { SourcePartial } from '../models/SourcePartial';
import type { SourceWithRelations } from '../models/SourceWithRelations';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SourceControllerService {

    /**
     * @param where 
     * @returns loopback_Count Source model count
     * @throws ApiError
     */
    public static sourceControllerCount(
where?: any,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sources/count',
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
    public static sourceControllerReplaceById(
id: string,
requestBody?: Source,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/sources/{id}',
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
    public static sourceControllerUpdateById(
id: string,
requestBody?: SourcePartial,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/sources/{id}',
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
     * @returns SourceWithRelations Source model instance
     * @throws ApiError
     */
    public static sourceControllerFindById(
id: string,
filter?: any,
): CancelablePromise<SourceWithRelations> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sources/{id}',
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
    public static sourceControllerDeleteById(
id: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/sources/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns Source Source model instance
     * @throws ApiError
     */
    public static sourceControllerCreate(
requestBody?: NewSource,
): CancelablePromise<Source> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sources',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param where 
     * @param requestBody 
     * @returns loopback_Count Source PATCH success count
     * @throws ApiError
     */
    public static sourceControllerUpdateAll(
where?: any,
requestBody?: SourcePartial,
): CancelablePromise<loopback_Count> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/sources',
            query: {
                'where': where,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param filter 
     * @returns SourceWithRelations Array of Source model instances
     * @throws ApiError
     */
    public static sourceControllerFind(
filter?: any,
): CancelablePromise<Array<SourceWithRelations>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sources',
            query: {
                'filter': filter,
            },
        });
    }

}
