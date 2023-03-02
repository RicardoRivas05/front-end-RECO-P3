/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Quantity_IncludeFilter_Items } from './Quantity_IncludeFilter_Items';

export type Quantity_Filter1 = {
    offset?: number;
    limit?: number;
    skip?: number;
    order?: (string | Array<string>);
    where?: any;
    fields?: ({
id?: boolean;
name?: boolean;
unit?: boolean;
status?: boolean;
} | Array<'id' | 'name' | 'unit' | 'status'>);
    include?: Array<(Quantity_IncludeFilter_Items | string)>;
};
