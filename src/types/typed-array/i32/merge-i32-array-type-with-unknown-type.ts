import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { I32_ARRAY_TYPE } from './i32-array-type.constant';
import { II32ArrayType } from './i32-array-type.type';
import { isI32ArrayType } from './is-i32-array-type';

export function mergeI32ArrayTypeWithUnknownType(
  typeA: II32ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isI32ArrayType(typeB)) {
    return I32_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
