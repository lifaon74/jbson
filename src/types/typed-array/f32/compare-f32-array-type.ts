import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF32ArrayType } from './f32-array-type.type';
import { isF32ArrayType } from './is-f32-array-type';

export function compareF32ArrayType(
  typeA: IF32ArrayType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isF32ArrayType(typeB);
  }
}
