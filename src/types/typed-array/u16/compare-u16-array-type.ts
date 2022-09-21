import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU16ArrayType } from './is-u16-array-type';
import { IU16ArrayType } from './u16-array-type.type';

export function compareU16ArrayType(
  typeA: IU16ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isU16ArrayType(typeB);
  }
}
