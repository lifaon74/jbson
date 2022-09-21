import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../union/create-simple-union';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { mergeUnknownTypes } from '../unknown/merge-unknown-types';
import { IUnknownType } from '../unknown/unknown-type.type';
import { IArrayType } from './array-type.type';
import { createArrayType } from './create-array-type';
import { isArrayType } from './is-array-type';

export function mergeArrayTypeWithUnknownType(
  typeA: IArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isArrayType(typeB)) {
    return createArrayType(mergeUnknownTypes(typeA.itemsType, typeB.itemsType));
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
