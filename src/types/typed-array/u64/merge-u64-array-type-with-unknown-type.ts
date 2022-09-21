import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU64ArrayType } from './is-u64-array-type';
import { U64_ARRAY_TYPE } from './u64-array-type.constant';
import { IU64ArrayType } from './u64-array-type.type';

export function mergeU64ArrayTypeWithUnknownType(
  typeA: IU64ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isU64ArrayType(typeB)) {
    return U64_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
