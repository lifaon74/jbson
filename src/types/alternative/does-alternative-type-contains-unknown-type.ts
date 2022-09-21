import { compareUnknownTypes } from '../unknown/compare-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IAlternativeType } from './alternative-type.type';

export function doesAlternativeTypeContainsUnknownType(
  typeA: IAlternativeType,
  typeB: IUnknownType,
): boolean {
  return typeA.types.some((_typeA: IUnknownType): boolean => compareUnknownTypes(_typeA, typeB));
}
