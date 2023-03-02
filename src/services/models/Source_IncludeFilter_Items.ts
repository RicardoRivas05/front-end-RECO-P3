/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Source_ScopeFilter } from './Source_ScopeFilter';

export type Source_IncludeFilter_Items = {
    relation?: Source_IncludeFilter_Items.relation;
    scope?: Source_ScopeFilter;
};

export namespace Source_IncludeFilter_Items {

    export enum relation {
        SOURCE_DATOS = 'sourceDatos',
    }


}
