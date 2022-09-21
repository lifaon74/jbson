import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../unknown/unknown-type.type';
import { isUndefinedType } from './is-undefined-type';
import { UNDEFINED_TYPE } from './undefined-type.constant';
import { IUndefinedType } from './undefined-type.type';

export function mergeUndefinedTypeWithUnknownType(
  typeA: IUndefinedType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isUndefinedType(typeB)) {
    return UNDEFINED_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
