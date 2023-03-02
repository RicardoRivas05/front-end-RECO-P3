/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Quantity_ScopeFilter } from './Quantity_ScopeFilter';

export type Quantity_IncludeFilter_Items = {
    relation?: Quantity_IncludeFilter_Items.relation;
    scope?: Quantity_ScopeFilter;
};

export namespace Quantity_IncludeFilter_Items {

    export enum relation {
        QUANTITY_DATOS = 'quantityDatos',
    }


}
