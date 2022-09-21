import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF64Type } from './f64-type.type';
import { isF64Type } from './is-f64-type';

export function compareF64TypeWithUnknownType(
  typeA: IF64Type,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isF64Type(typeB);
  }
}
