import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isStringType } from './is-string-type';
import { STRING_TYPE } from './string-type.constant';
import { IStringType } from './string-type.type';

export function mergeStringTypeWithUnknownType(
  typeA: IStringType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isStringType(typeB)) {
    return STRING_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
