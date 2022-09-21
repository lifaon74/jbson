import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isU16ArrayType } from './is-u16-array-type';
import { U16_ARRAY_TYPE } from './u16-array-type.constant';
import { IU16ArrayType } from './u16-array-type.type';

export function mergeU16ArrayTypeWithUnknownType(
  typeA: IU16ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isU16ArrayType(typeB)) {
    return U16_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
