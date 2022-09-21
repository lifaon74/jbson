import { IUnknownType } from '../unknown/unknown-type.type';

// INFO: should never contain a union in its types
// INFO: should never contain a alternatives having common types in its types

export type IUnionTypeTypes = readonly [IUnknownType, ...IUnknownType[]];

export interface IUnionType {
  type: 'union';
  types: IUnionTypeTypes;
}
