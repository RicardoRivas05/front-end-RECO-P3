/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Source_IncludeFilter_Items } from './Source_IncludeFilter_Items';

export type Source_Filter1 = {
    offset?: number;
    limit?: number;
    skip?: number;
    order?: (string | Array<string>);
    where?: any;
    fields?: ({
id?: boolean;
name?: boolean;
status?: boolean;
} | Array<'id' | 'name' | 'status'>);
    include?: Array<(Source_IncludeFilter_Items | string)>;
};
