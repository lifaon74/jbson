import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { BOOLEAN_TYPE } from './boolean-type.constant';
import { IBooleanType } from './boolean-type.type';
import { isBooleanType } from './is-boolean-type';

export function mergeBooleanTypeWithUnknownType(
  typeA: IBooleanType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isBooleanType(typeB)) {
    return BOOLEAN_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
