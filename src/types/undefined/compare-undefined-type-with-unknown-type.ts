import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isUndefinedType } from './is-undefined-type';
import { IUndefinedType } from './undefined-type.type';

export function compareUndefinedTypeWithUnknownType(
  typeA: IUndefinedType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isUndefinedType(typeB);
  }
}
