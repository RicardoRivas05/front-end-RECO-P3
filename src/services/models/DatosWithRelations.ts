/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuantityWithRelations } from './QuantityWithRelations';
import type { SourceWithRelations } from './SourceWithRelations';

/**
 * (tsType: DatosWithRelations, schemaOptions: { includeRelations: true })
 */
export type DatosWithRelations = {
    id?: string;
    dateTime: string;
    value?: number;
    sourceId?: string;
    quantityId?: string;
    source?: SourceWithRelations;
    quantity?: QuantityWithRelations;
};
