import { isAlternativeType } from '../alternative/is-alternative-type';
import { mergeAlternativeTypeWithUnknownType } from '../alternative/merge-alternative-type-with-unknown-type';
import { isArrayType } from '../array/is-array-type';
import { mergeArrayTypeWithUnknownType } from '../array/merge-array-type-with-unknown-type';
import { isBigintType } from '../bigint/is-bigint-type';
import { mergeBigintTypeWithUnknownType } from '../bigint/merge-bigint-type-with-unknown-type';
import { isBooleanType } from '../boolean/is-boolean-type';
import { mergeBooleanTypeWithUnknownType } from '../boolean/merge-boolean-type-with-unknown-type';
import { isMapType } from '../map/is-map-type';
import { mergeMapTypeWithUnknownType } from '../map/merge-map-type-with-unknown-type';
import { isNullType } from '../null/is-null-type';
import { mergeNullTypeWithUnknownType } from '../null/merge-null-type-with-unknown-type';
import { isF32Type } from '../number/f32/is-f32-type';
import { mergeF32TypeWithUnknownType } from '../number/f32/merge-f32-type-with-unknown-type';
import { isF64Type } from '../number/f64/is-f64-type';
import { mergeF64TypeWithUnknownType } from '../number/f64/merge-f64-type-with-unknown-type';
import { isI16Type } from '../number/i16/is-i16-type';
import { mergeI16TypeWithUnknownType } from '../number/i16/merge-i16-type-with-unknown-type';
import { isI32Type } from '../number/i32/is-i32-type';
import { mergeI32TypeWithUnknownType } from '../number/i32/merge-i32-type-with-unknown-type';
import { isI64Type } from '../number/i64/is-i64-type';
import { mergeI64TypeWithUnknownType } from '../number/i64/merge-i64-type-with-unknown-type';
import { isI8Type } from '../number/i8/is-i8-type';
import { mergeI8TypeWithUnknownType } from '../number/i8/merge-i8-type-with-unknown-type';
import { isU16Type } from '../number/u16/is-u16-type';
import { mergeU16TypeWithUnknownType } from '../number/u16/merge-u16-type-with-unknown-type';
import { isU32Type } from '../number/u32/is-u32-type';
import { mergeU32TypeWithUnknownType } from '../number/u32/merge-u32-type-with-unknown-type';
import { isU64Type } from '../number/u64/is-u64-type';
import { mergeU64TypeWithUnknownType } from '../number/u64/merge-u64-type-with-unknown-type';
import { isU8Type } from '../number/u8/is-u8-type';
import { mergeU8TypeWithUnknownType } from '../number/u8/merge-u8-type-with-unknown-type';
import { isObjectType } from '../object/is-object-type';
import { mergeObjectTypeWithUnknownType } from '../object/merge-object-type-with-unknown-type';
import { isSetType } from '../set/is-set-type';
import { mergeSetTypeWithUnknownType } from '../set/merge-set-type-with-unknown-type';
import { isStringType } from '../string/is-string-type';
import { mergeStringTypeWithUnknownType } from '../string/merge-string-type-with-unknown-type';
import { isF32ArrayType } from '../typed-array/f32/is-f32-array-type';
import { mergeF32ArrayTypeWithUnknownType } from '../typed-array/f32/merge-f32-array-type-with-unknown-type';
import { isF64ArrayType } from '../typed-array/f64/is-f64-array-type';
import { mergeF64ArrayTypeWithUnknownType } from '../typed-array/f64/merge-f64-array-type-with-unknown-type';
import { isI16ArrayType } from '../typed-array/i16/is-i16-array-type';
import { mergeI16ArrayTypeWithUnknownType } from '../typed-array/i16/merge-i16-array-type-with-unknown-type';
import { isI32ArrayType } from '../typed-array/i32/is-i32-array-type';
import { mergeI32ArrayTypeWithUnknownType } from '../typed-array/i32/merge-i32-array-type-with-unknown-type';
import { isI64ArrayType } from '../typed-array/i64/is-i64-array-type';
import { mergeI64ArrayTypeWithUnknownType } from '../typed-array/i64/merge-i64-array-type-with-unknown-type';
import { isI8ArrayType } from '../typed-array/i8/is-i8-array-type';
import { mergeI8ArrayTypeWithUnknownType } from '../typed-array/i8/merge-i8-array-type-with-unknown-type';
import { isU16ArrayType } from '../typed-array/u16/is-u16-array-type';
import { mergeU16ArrayTypeWithUnknownType } from '../typed-array/u16/merge-u16-array-type-with-unknown-type';
import { isU32ArrayType } from '../typed-array/u32/is-u32-array-type';
import { mergeU32ArrayTypeWithUnknownType } from '../typed-array/u32/merge-u32-array-type-with-unknown-type';
import { isU64ArrayType } from '../typed-array/u64/is-u64-array-type';
import { mergeU64ArrayTypeWithUnknownType } from '../typed-array/u64/merge-u64-array-type-with-unknown-type';
import { isU8ArrayType } from '../typed-array/u8/is-u8-array-type';
import { mergeU8ArrayTypeWithUnknownType } from '../typed-array/u8/merge-u8-array-type-with-unknown-type';
import { isUndefinedType } from '../undefined/is-undefined-type';
import { mergeUndefinedTypeWithUnknownType } from '../undefined/merge-undefined-type-with-unknown-type';
import { isUnionType } from '../union/is-union-type';
import { mergeUnionTypeWithUnknownType } from '../union/merge-union-type-with-unknown-type';
import { IUnknownType } from './unknown-type.type';

export function mergeUnknownTypes<GTypeA extends IUnknownType>(
  typeA: IUnknownType,
  typeB: IUnknownType,
): IUnknownType {
  if (isAlternativeType(typeA)) {
    return mergeAlternativeTypeWithUnknownType(typeA, typeB);
  } else if (isUnionType(typeA)) {
    return mergeUnionTypeWithUnknownType(typeA, typeB);
  } else if (isUndefinedType(typeA)) {
    return mergeUndefinedTypeWithUnknownType(typeA, typeB);
  } else if (isNullType(typeA)) {
    return mergeNullTypeWithUnknownType(typeA, typeB);
  } else if (isBooleanType(typeA)) {
    return mergeBooleanTypeWithUnknownType(typeA, typeB);
  } else if (isU8Type(typeA)) {
    return mergeU8TypeWithUnknownType(typeA, typeB);
  } else if (isU16Type(typeA)) {
    return mergeU16TypeWithUnknownType(typeA, typeB);
  } else if (isU32Type(typeA)) {
    return mergeU32TypeWithUnknownType(typeA, typeB);
  } else if (isU64Type(typeA)) {
    return mergeU64TypeWithUnknownType(typeA, typeB);
  } else if (isI8Type(typeA)) {
    return mergeI8TypeWithUnknownType(typeA, typeB);
  } else if (isI16Type(typeA)) {
    return mergeI16TypeWithUnknownType(typeA, typeB);
  } else if (isI32Type(typeA)) {
    return mergeI32TypeWithUnknownType(typeA, typeB);
  } else if (isI64Type(typeA)) {
    return mergeI64TypeWithUnknownType(typeA, typeB);
  } else if (isF32Type(typeA)) {
    return mergeF32TypeWithUnknownType(typeA, typeB);
  } else if (isF64Type(typeA)) {
    return mergeF64TypeWithUnknownType(typeA, typeB);
  } else if (isU8ArrayType(typeA)) {
    return mergeU8ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isU16ArrayType(typeA)) {
    return mergeU16ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isU32ArrayType(typeA)) {
    return mergeU32ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isU64ArrayType(typeA)) {
    return mergeU64ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isI8ArrayType(typeA)) {
    return mergeI8ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isI16ArrayType(typeA)) {
    return mergeI16ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isI32ArrayType(typeA)) {
    return mergeI32ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isI64ArrayType(typeA)) {
    return mergeI64ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isF32ArrayType(typeA)) {
    return mergeF32ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isF64ArrayType(typeA)) {
    return mergeF64ArrayTypeWithUnknownType(typeA, typeB);
  } else if (isBigintType(typeA)) {
    return mergeBigintTypeWithUnknownType(typeA, typeB);
  } else if (isStringType(typeA)) {
    return mergeStringTypeWithUnknownType(typeA, typeB);
  } else if (isArrayType(typeA)) {
    return mergeArrayTypeWithUnknownType(typeA, typeB);
  } else if (isSetType(typeA)) {
    return mergeSetTypeWithUnknownType(typeA, typeB);
  } else if (isObjectType(typeA)) {
    return mergeObjectTypeWithUnknownType(typeA, typeB);
  } else if (isMapType(typeA)) {
    return mergeMapTypeWithUnknownType(typeA, typeB);
  } else {
    throw new Error(`Unsupported type`);
  }
}
