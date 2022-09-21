import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU32ArrayType } from './is-u32-array-type';
import { U32_ARRAY_TYPE } from './u32-array-type.constant';
import { IU32ArrayType } from './u32-array-type.type';

export function mergeU32ArrayTypeWithUnknownType(
  typeA: IU32ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isU32ArrayType(typeB)) {
    return U32_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
