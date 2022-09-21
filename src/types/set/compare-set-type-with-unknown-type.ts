import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isSetType } from './is-set-type';
import { ISetType } from './set-type.type';

export function compareSetTypeWithUnknownType(
  typeA: ISetType,
  typeB: IUnknownType,
): boolean {
  return isSetType(typeB)
    && compareUnknownTypes(typeA.itemsType, typeB.itemsType);
}
