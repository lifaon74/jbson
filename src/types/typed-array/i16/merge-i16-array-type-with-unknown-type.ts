import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { I16_ARRAY_TYPE } from './i16-array-type.constant';
import { II16ArrayType } from './i16-array-type.type';
import { isI16ArrayType } from './is-i16-array-type';

export function mergeI16ArrayTypeWithUnknownType(
  typeA: II16ArrayType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isI16ArrayType(typeB)) {
    return I16_ARRAY_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
