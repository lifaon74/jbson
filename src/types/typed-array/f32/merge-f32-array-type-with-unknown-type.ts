import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { F32_ARRAY_TYPE } from './f32-array-type.constant';
import { IF32ArrayType } from './f32-array-type.type';
import { isF32ArrayType } from './is-f32-array-type';

export function mergeF32ArrayTypeWithUnknownType(
  typeA: IF32ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isF32ArrayType(typeB)) {
    return F32_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
