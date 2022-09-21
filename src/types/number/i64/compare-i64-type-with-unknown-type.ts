import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isI64Type } from './is-i64-type';
import { II64Type } from './i64-type.type';

export function compareI64TypeWithUnknownType(
  typeA: II64Type,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isI64Type(typeB);
  }
}
