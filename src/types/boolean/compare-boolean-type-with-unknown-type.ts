import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IBooleanType } from './boolean-type.type';
import { isBooleanType } from './is-boolean-type';

export function compareBooleanTypeWithUnknownType(
  typeA: IBooleanType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isBooleanType(typeB);
  }
}
