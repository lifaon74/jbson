import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isBigintType } from './is-bigint-type';
import { BIGINT_TYPE } from './bigint-type.constant';
import { IBigintType } from './bigint-type.type';

export function mergeBigintTypeWithUnknownType(
  typeA: IBigintType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isBigintType(typeB)) {
    return BIGINT_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
