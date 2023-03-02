/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PingResponse } from '../models/PingResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PingControllerService {

    /**
     * @returns PingResponse Ping Response
     * @throws ApiError
     */
    public static pingControllerPing(): CancelablePromise<PingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ping',
        });
    }

}
