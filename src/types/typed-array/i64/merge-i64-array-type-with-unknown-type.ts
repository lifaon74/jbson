import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { I64_ARRAY_TYPE } from './i64-array-type.constant';
import { II64ArrayType } from './i64-array-type.type';
import { isI64ArrayType } from './is-i64-array-type';

export function mergeI64ArrayTypeWithUnknownType(
  typeA: II64ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isI64ArrayType(typeB)) {
    return I64_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
