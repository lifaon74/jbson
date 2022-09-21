import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isNullType } from './is-null-type';
import { NULL_TYPE } from './null-type.constant';
import { INullType } from './null-type.type';

export function mergeNullTypeWithUnknownType(
  typeA: INullType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isNullType(typeB)) {
    return NULL_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
