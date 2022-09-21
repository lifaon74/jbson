import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU8ArrayType } from './is-u8-array-type';
import { U8_ARRAY_TYPE } from './u8-array-type.constant';
import { IU8ArrayType } from './u8-array-type.type';

export function mergeU8ArrayTypeWithUnknownType(
  typeA: IU8ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isU8ArrayType(typeB)) {
    return U8_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
