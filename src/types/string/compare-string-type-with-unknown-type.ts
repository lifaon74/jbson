import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isStringType } from './is-string-type';
import { IStringType } from './string-type.type';

export function compareStringTypeWithUnknownType(
  typeA: IStringType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isStringType(typeB);
  }
}
