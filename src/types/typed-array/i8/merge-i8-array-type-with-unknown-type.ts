import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { I8_ARRAY_TYPE } from './i8-array-type.constant';
import { II8ArrayType } from './i8-array-type.type';
import { isI8ArrayType } from './is-i8-array-type';

export function mergeI8ArrayTypeWithUnknownType(
  typeA: II8ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isI8ArrayType(typeB)) {
    return I8_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
