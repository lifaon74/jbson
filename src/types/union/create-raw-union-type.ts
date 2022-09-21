import { IUnionType, IUnionTypeTypes } from './union-type.type';

export function createRawUnionType(
  types: IUnionTypeTypes,
): IUnionType {
  return {
    type: 'union',
    types,
  };
}
