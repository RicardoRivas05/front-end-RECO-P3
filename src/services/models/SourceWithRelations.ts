/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DatosWithRelations } from './DatosWithRelations';

/**
 * (tsType: SourceWithRelations, schemaOptions: { includeRelations: true })
 */
export type SourceWithRelations = {
    id?: string;
    name: string;
    status?: boolean;
    sourceDatos?: Array<DatosWithRelations>;
};
