import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { mergeUnknownTypes } from '../unknown/merge-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { createSetType } from './create-set-type';
import { isSetType } from './is-set-type';
import { ISetType } from './set-type.type';

export function mergeSetTypeWithUnknownType(
  typeA: ISetType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isSetType(typeB)) {
    return createSetType(mergeUnknownTypes(typeA.itemsType, typeB.itemsType));
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
