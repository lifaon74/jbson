import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { F64_ARRAY_TYPE } from './f64-array-type.constant';
import { IF64ArrayType } from './f64-array-type.type';
import { isF64ArrayType } from './is-f64-array-type';

export function mergeF64ArrayTypeWithUnknownType(
  typeA: IF64ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isF64ArrayType(typeB)) {
    return F64_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
