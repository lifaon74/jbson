import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU64ArrayType } from './is-u64-array-type';
import { IU64ArrayType } from './u64-array-type.type';

export function compareU64ArrayType(
  typeA: IU64ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isU64ArrayType(typeB);
  }
}
