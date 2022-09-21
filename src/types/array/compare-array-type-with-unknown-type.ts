import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IArrayType } from './array-type.type';
import { isArrayType } from './is-array-type';

export function compareArrayTypeWithUnknownType(
  typeA: IArrayType,
  typeB: IUnknownType,
): boolean {
  return isArrayType(typeB)
    && compareUnknownTypes(typeA.itemsType, typeB.itemsType);
}
