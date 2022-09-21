import { isAlternativeType } from '../../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../../alternative/merge-alternative-type-with-unknown-type';
import { createSimpleUnion } from '../../union/create-simple-union';
import { isUnionType } from '../../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../../union/merge-union-type-with-unknown-type';
import { IUnknownType } from '../../unknown/unknown-type.type';
import { isF32Type } from '../f32/is-f32-type';
import { F64_TYPE } from '../f64/f64-type.constant';
import { isF64Type } from '../f64/is-f64-type';
import { isI16Type } from '../i16/is-i16-type';
import { I64_TYPE } from '../i64/i64-type.constant';
import { isI64Type } from '../i64/is-i64-type';
import { isI8Type } from '../i8/is-i8-type';
import { isU16Type } from '../u16/is-u16-type';
import { isU32Type } from '../u32/is-u32-type';
import { isU64Type } from '../u64/is-u64-type';
import { U64_TYPE } from '../u64/u64-type.constant';
import { isU8Type } from '../u8/is-u8-type';
import { I32_TYPE } from './i32-type.constant';
import { II32Type } from './i32-type.type';
import { isI32Type } from './is-i32-type';

export function mergeI32TypeWithUnknownType(
  typeA: II32Type,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeB)) {
    return mergeAlternativeTypeWithUnknownType(typeB, typeA);
  } else if (isUnionType(typeB)) {
    return mergeUnionTypeWithUnknownType(typeB, typeA);
  } else if (isU8Type(typeB)) {
    return I32_TYPE;
  } else if (isU16Type(typeB)) {
    return I32_TYPE;
  } else if (isU32Type(typeB)) {
    return I64_TYPE;
  } else if (isU64Type(typeB)) {
    return U64_TYPE;
  } else if (isI8Type(typeB)) {
    return I32_TYPE;
  } else if (isI16Type(typeB)) {
    return I32_TYPE;
  } else if (isI32Type(typeB)) {
    return I32_TYPE;
  } else if (isI64Type(typeB)) {
    return I64_TYPE;
  } else if (isF32Type(typeB)) {
    return F64_TYPE;
  } else if (isF64Type(typeB)) {
    return F64_TYPE;
  } else {
    return createSimpleUnion(typeA, typeB);
  }
}
