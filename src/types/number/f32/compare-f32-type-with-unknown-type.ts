import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { IF32Type } from './f32-type.type';
import { isF32Type } from './is-f32-type';

export function compareF32TypeWithUnknownType(
  typeA: IF32Type,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isF32Type(typeB);
  }
}
