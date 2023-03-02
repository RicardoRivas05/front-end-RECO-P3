/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Datos_ScopeFilter } from './Datos_ScopeFilter';

export type Datos_IncludeFilter_Items = {
    relation?: Datos_IncludeFilter_Items.relation;
    scope?: Datos_ScopeFilter;
};

export namespace Datos_IncludeFilter_Items {

    export enum relation {
        SOURCE = 'source',
        QUANTITY = 'quantity',
    }


}
