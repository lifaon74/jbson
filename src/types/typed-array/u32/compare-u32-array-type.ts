import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU32ArrayType } from './is-u32-array-type';
import { IU32ArrayType } from './u32-array-type.type';

export function compareU32ArrayType(
  typeA: IU32ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isU32ArrayType(typeB);
  }
}
