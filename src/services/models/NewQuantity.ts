/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Quantity, 'id'>, schemaOptions: { title: 'NewQuantity', exclude: [ 'id' ] })
 */
export type NewQuantity = {
    name: string;
    unit: string;
    status?: boolean;
};
