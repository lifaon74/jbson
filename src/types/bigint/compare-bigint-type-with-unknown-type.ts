import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isBigintType } from './is-bigint-type';
import { IBigintType } from './bigint-type.type';

export function compareBigintTypeWithUnknownType(
  typeA: IBigintType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeB)) {
    return compareAlternativeTypeWithUnknownType(typeB, typeA);
  } else {
    return isBigintType(typeB);
  }
}
