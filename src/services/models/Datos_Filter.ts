/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Datos_IncludeFilter_Items } from './Datos_IncludeFilter_Items';

export type Datos_Filter = {
    offset?: number;
    limit?: number;
    skip?: number;
    order?: (string | Array<string>);
    fields?: ({
id?: boolean;
dateTime?: boolean;
value?: boolean;
sourceId?: boolean;
quantityId?: boolean;
} | Array<'id' | 'dateTime' | 'value' | 'sourceId' | 'quantityId'>);
    include?: Array<(Datos_IncludeFilter_Items | string)>;
};
