import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { II64ArrayType } from './i64-array-type.type';
import { isI64ArrayType } from './is-i64-array-type';

export function compareI64ArrayType(
  typeA: II64ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isI64ArrayType(typeB);
  }
}
