import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { II16ArrayType } from './i16-array-type.type';
import { isI16ArrayType } from './is-i16-array-type';

export function compareI16ArrayType(
  typeA: II16ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isI16ArrayType(typeB);
  }
}
