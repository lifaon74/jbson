import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { II8ArrayType } from './i8-array-type.type';
import { isI8ArrayType } from './is-i8-array-type';

export function compareI8ArrayType(
  typeA: II8ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isI8ArrayType(typeB);
  }
}
