import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF64ArrayType } from './f64-array-type.type';
import { isF64ArrayType } from './is-f64-array-type';

export function compareF64ArrayType(
  typeA: IF64ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isF64ArrayType(typeB);
  }
}
