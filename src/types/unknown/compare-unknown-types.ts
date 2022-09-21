import { compareAlternativeTypeWithUnknownType } from '../alternative/compare-alternative-type-with-unknown-type';
import { isAlternativeType } from '../alternative/is-alternative-type';
import { compareArrayTypeWithUnknownType } from '../array/compare-array-type-with-unknown-type';
import { isArrayType } from '../array/is-array-type';
import { compareBigintTypeWithUnknownType } from '../bigint/compare-bigint-type-with-unknown-type';
import { isBigintType } from '../bigint/is-bigint-type';
import { compareBooleanTypeWithUnknownType } from '../boolean/compare-boolean-type-with-unknown-type';
import { isBooleanType } from '../boolean/is-boolean-type';
import { compareMapTypeWithUnknownType } from '../map/compare-map-type-with-unknown-type';
import { isMapType } from '../map/is-map-type';
import { compareNullTypeWithUnknownType } from '../null/compare-null-type-with-unknown-type';
import { isNullType } from '../null/is-null-type';
import { compareF32TypeWithUnknownType } from '../number/f32/compare-f32-type-with-unknown-type';
import { isF32Type } from '../number/f32/is-f32-type';
import { compareF64TypeWithUnknownType } from '../number/f64/compare-f64-type-with-unknown-type';
import { isF64Type } from '../number/f64/is-f64-type';
import { compareI16TypeWithUnknownType } from '../number/i16/compare-i16-type-with-unknown-type';
import { isI16Type } from '../number/i16/is-i16-type';
import { compareI32TypeWithUnknownType } from '../number/i32/compare-i32-type-with-unknown-type';
import { isI32Type } from '../number/i32/is-i32-type';
import { compareI64TypeWithUnknownType } from '../number/i64/compare-i64-type-with-unknown-type';
import { isI64Type } from '../number/i64/is-i64-type';
import { compareI8TypeWithUnknownType } from '../number/i8/compare-i8-type-with-unknown-type';
import { isI8Type } from '../number/i8/is-i8-type';
import { compareU16Type } from '../number/u16/compare-u16-type';
import { isU16Type } from '../number/u16/is-u16-type';
import { compareU32TypeWithUnknownType } from '../number/u32/compare-u32-type-with-unknown-type';
import { isU32Type } from '../number/u32/is-u32-type';
import { compareU64TypeWithUnknownType } from '../number/u64/compare-u64-type-with-unknown-type';
import { isU64Type } from '../number/u64/is-u64-type';
import { compareU8Type } from '../number/u8/compare-u8-type';
import { isU8Type } from '../number/u8/is-u8-type';
import { compareObjectTypeWithUnknownType } from '../object/compare-object-type-with-unknown-type';
import { isObjectType } from '../object/is-object-type';
import { comparePointerTypeWithUnknownType } from '../pointer/compare-pointer-type-with-unknown-type';
import { isPointerType } from '../pointer/is-pointer-type';
import { compareSetTypeWithUnknownType } from '../set/compare-set-type-with-unknown-type';
import { isSetType } from '../set/is-set-type';
import { compareStringTypeWithUnknownType } from '../string/compare-string-type-with-unknown-type';
import { isStringType } from '../string/is-string-type';
import { compareF32ArrayType } from '../typed-array/f32/compare-f32-array-type';
import { isF32ArrayType } from '../typed-array/f32/is-f32-array-type';
import { compareF64ArrayType } from '../typed-array/f64/compare-f64-array-type';
import { isF64ArrayType } from '../typed-array/f64/is-f64-array-type';
import { compareI16ArrayType } from '../typed-array/i16/compare-i16-array-type';
import { isI16ArrayType } from '../typed-array/i16/is-i16-array-type';
import { compareI32ArrayType } from '../typed-array/i32/compare-i32-array-type';
import { isI32ArrayType } from '../typed-array/i32/is-i32-array-type';
import { compareI64ArrayType } from '../typed-array/i64/compare-i64-array-type';
import { isI64ArrayType } from '../typed-array/i64/is-i64-array-type';
import { compareI8ArrayType } from '../typed-array/i8/compare-i8-array-type';
import { isI8ArrayType } from '../typed-array/i8/is-i8-array-type';
import { compareU16ArrayType } from '../typed-array/u16/compare-u16-array-type';
import { isU16ArrayType } from '../typed-array/u16/is-u16-array-type';
import { compareU32ArrayType } from '../typed-array/u32/compare-u32-array-type';
import { isU32ArrayType } from '../typed-array/u32/is-u32-array-type';
import { compareU64ArrayType } from '../typed-array/u64/compare-u64-array-type';
import { isU64ArrayType } from '../typed-array/u64/is-u64-array-type';
import { compareU8ArrayType } from '../typed-array/u8/compare-u8-array-type';
import { isU8ArrayType } from '../typed-array/u8/is-u8-array-type';
import { compareUndefinedTypeWithUnknownType } from '../undefined/compare-undefined-type-with-unknown-type';
import { isUndefinedType } from '../undefined/is-undefined-type';
import { compareUnionTypeWithUnknownType } from '../union/compare-union-type-with-unknown-type';
import { isUnionType } from '../union/is-union-type';
import { IUnknownType } from './unknown-type.type';

export function compareUnknownTypes(
  typeA: IUnknownType,
  typeB: IUnknownType,
): boolean {
  if (isAlternativeType(typeA)) {
    return compareAlternativeTypeWithUnknownType(typeA, typeB);
  } else if (isUnionType(typeA)) {
    return compareUnionTypeWithUnknownType(typeA, typeB);
  } else if (isUndefinedType(typeA)) {
    return compareUndefinedTypeWithUnknownType(typeA, typeB);
  } else if (isNullType(typeA)) {
    return compareNullTypeWithUnknownType(typeA, typeB);
  } else if (isBooleanType(typeA)) {
    return compareBooleanTypeWithUnknownType(typeA, typeB);
  } else if (isU8Type(typeA)) {
    return compareU8Type(typeA, typeB);
  } else if (isU16Type(typeA)) {
    return compareU16Type(typeA, typeB);
  } else if (isU32Type(typeA)) {
    return compareU32TypeWithUnknownType(typeA, typeB);
  } else if (isU64Type(typeA)) {
    return compareU64TypeWithUnknownType(typeA, typeB);
  } else if (isI8Type(typeA)) {
    return compareI8TypeWithUnknownType(typeA, typeB);
  } else if (isI16Type(typeA)) {
    return compareI16TypeWithUnknownType(typeA, typeB);
  } else if (isI32Type(typeA)) {
    return compareI32TypeWithUnknownType(typeA, typeB);
  } else if (isI64Type(typeA)) {
    return compareI64TypeWithUnknownType(typeA, typeB);
  } else if (isF32Type(typeA)) {
    return compareF32TypeWithUnknownType(typeA, typeB);
  } else if (isF64Type(typeA)) {
    return compareF64TypeWithUnknownType(typeA, typeB);
  } else if (isU8ArrayType(typeA)) {
    return compareU8ArrayType(typeA, typeB);
  } else if (isU16ArrayType(typeA)) {
    return compareU16ArrayType(typeA, typeB);
  } else if (isU32ArrayType(typeA)) {
    return compareU32ArrayType(typeA, typeB);
  } else if (isU64ArrayType(typeA)) {
    return compareU64ArrayType(typeA, typeB);
  } else if (isI8ArrayType(typeA)) {
    return compareI8ArrayType(typeA, typeB);
  } else if (isI16ArrayType(typeA)) {
    return compareI16ArrayType(typeA, typeB);
  } else if (isI32ArrayType(typeA)) {
    return compareI32ArrayType(typeA, typeB);
  } else if (isI64ArrayType(typeA)) {
    return compareI64ArrayType(typeA, typeB);
  } else if (isF32ArrayType(typeA)) {
    return compareF32ArrayType(typeA, typeB);
  } else if (isF64ArrayType(typeA)) {
    return compareF64ArrayType(typeA, typeB);
  } else if (isBigintType(typeA)) {
    return compareBigintTypeWithUnknownType(typeA, typeB);
  } else if (isStringType(typeA)) {
    return compareStringTypeWithUnknownType(typeA, typeB);
  } else if (isArrayType(typeA)) {
    return compareArrayTypeWithUnknownType(typeA, typeB);
  } else if (isSetType(typeA)) {
    return compareSetTypeWithUnknownType(typeA, typeB);
  } else if (isObjectType(typeA)) {
    return compareObjectTypeWithUnknownType(typeA, typeB);
  } else if (isMapType(typeA)) {
    return compareMapTypeWithUnknownType(typeA, typeB);
  } else if (isPointerType(typeA)) {
    return comparePointerTypeWithUnknownType(typeA, typeB);
  } else {
    throw new Error(`Unsupported type`);
  }
}
