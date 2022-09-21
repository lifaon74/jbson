import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isNullType } from './is-null-type';
import { INullType } from './null-type.type';

export function compareNullTypeWithUnknownType(
  typeA: INullType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isNullType(typeB);
  }
}
