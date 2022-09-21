import { compareAlternativeTypeWithUnknownType } from '../../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../../alternative/is-alternative-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU32Type } from './is-u32-type';
import { IU32Type } from './u32-type.type';

export function compareU32TypeWithUnknownType(
  typeA: IU32Type,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isU32Type(typeB);
  }
}
