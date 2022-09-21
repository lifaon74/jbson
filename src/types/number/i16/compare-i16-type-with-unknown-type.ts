import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { II16Type } from './i16-type.type';
import { isI16Type } from './is-i16-type';

export function compareI16TypeWithUnknownType(
  typeA: II16Type,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isI16Type(typeB);
  }
}
