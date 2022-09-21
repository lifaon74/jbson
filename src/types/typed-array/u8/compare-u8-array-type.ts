import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU8ArrayType } from './is-u8-array-type';
import { IU8ArrayType } from './u8-array-type.type';

export function compareU8ArrayType(
  typeA: IU8ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isU8ArrayType(typeB);
  }
}
