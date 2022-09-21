import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IUnionType } from './union-type.type';

export function doesUnionTypeContainsUnknownType(
  typeA: IUnionType,
  typeB: IUnknownType,
): boolean {
  return typeA.types.some((_typeA: IUnknownType): boolean => compareUnknownTypes(_typeA, typeB));
}
