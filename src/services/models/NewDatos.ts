/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Datos, 'id'>, schemaOptions: { title: 'NewDatos', exclude: [ 'id' ] })
 */
export type NewDatos = {
    dateTime: string;
    value?: number;
    sourceId?: string;
    quantityId?: string;
};
