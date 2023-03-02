/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Source } from '../models/Source';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DatosSourceControllerService {

    /**
     * @param id 
     * @returns Source Source belonging to Datos
     * @throws ApiError
     */
    public static datosSourceControllerGetSource(
id: string,
): CancelablePromise<Array<Source>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datos/{id}/source',
            path: {
                'id': id,
            },
        });
    }

}
