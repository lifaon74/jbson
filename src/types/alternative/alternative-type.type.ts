import { IUnknownType } from '../unknown/unknown-type.type';

export type IAlternativeTypeTypes = readonly [IUnknownType, ...IUnknownType[]];

export interface IAlternativeType {
  type: 'alternative';
  types: IAlternativeTypeTypes;
}
