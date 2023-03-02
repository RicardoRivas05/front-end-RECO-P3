/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Datos, 'id'>, 'quantityId'>, schemaOptions: { title: 'NewDatosInQuantity', exclude: [ 'id' ], optional: [ 'quantityId' ] })
 */
export type NewDatosInQuantity = {
    dateTime: string;
    value?: number;
    sourceId?: string;
    quantityId?: string;
};
