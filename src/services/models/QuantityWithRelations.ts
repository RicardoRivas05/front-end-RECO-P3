/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatosWithRelations } from './DatosWithRelations';

/**
 * (tsType: QuantityWithRelations, schemaOptions: { includeRelations: true })
 */
export type QuantityWithRelations = {
    id?: string;
    name: string;
    unit: string;
    status?: boolean;
    quantityDatos?: Array<DatosWithRelations>;
};
