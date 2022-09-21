import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isPointerType } from './is-pointer-type';
import { IPointerType } from './pointer-type.type';

export function comparePointerTypeWithUnknownType(
  typeA: IPointerType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isPointerType(typeB);
  }
}
