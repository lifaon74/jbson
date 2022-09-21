import { isAlternativeType } from '../../../types/alternative/is-alternative-type';
import { isArrayType } from '../../../types/array/is-array-type';
import { isBigintType } from '../../../types/bigint/is-bigint-type';
import { isBooleanType } from '../../../types/boolean/is-boolean-type';
import { isMapType } from '../../../types/map/is-map-type';
import { isNullType } from '../../../types/null/is-null-type';
import { isF32Type } from '../../../types/number/f32/is-f32-type';
import { isF64Type } from '../../../types/number/f64/is-f64-type';
import { isI16Type } from '../../../types/number/i16/is-i16-type';
import { isI32Type } from '../../../types/number/i32/is-i32-type';
import { isI64Type } from '../../../types/number/i64/is-i64-type';
import { isI8Type } from '../../../types/number/i8/is-i8-type';
import { isU16Type } from '../../../types/number/u16/is-u16-type';
import { isU32Type } from '../../../types/number/u32/is-u32-type';
import { isU64Type } from '../../../types/number/u64/is-u64-type';
import { isU8Type } from '../../../types/number/u8/is-u8-type';
import { isObjectType } from '../../../types/object/is-object-type';
import { isPointerType } from '../../../types/pointer/is-pointer-type';
import { isSetType } from '../../../types/set/is-set-type';
import { isStringType } from '../../../types/string/is-string-type';
import { isF32ArrayType } from '../../../types/typed-array/f32/is-f32-array-type';
import { isF64ArrayType } from '../../../types/typed-array/f64/is-f64-array-type';
import { isI16ArrayType } from '../../../types/typed-array/i16/is-i16-array-type';
import { isI32ArrayType } from '../../../types/typed-array/i32/is-i32-array-type';
import { isI64ArrayType } from '../../../types/typed-array/i64/is-i64-array-type';
import { isI8ArrayType } from '../../../types/typed-array/i8/is-i8-array-type';
import { isU16ArrayType } from '../../../types/typed-array/u16/is-u16-array-type';
import { isU32ArrayType } from '../../../types/typed-array/u32/is-u32-array-type';
import { isU64ArrayType } from '../../../types/typed-array/u64/is-u64-array-type';
import { isU8ArrayType } from '../../../types/typed-array/u8/is-u8-array-type';
import { isUndefinedType } from '../../../types/undefined/is-undefined-type';
import { isUnionType } from '../../../types/union/is-union-type';
import { IUnknownType } from '../../../types/unknown/unknown-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_alternative_type } from '../alternative/jbson-encode-alternative-type';
import { jbson_encode_array_type } from '../array/jbson-encode-array-type';
import { jbson_encode_bigint_type } from '../bigint/jbson-encode-bigint-type';
import { jbson_encode_boolean_type } from '../boolean/jbson-encode-boolean-type';
import { jbson_encode_map_type } from '../map/jbson-encode-map-type';
import { jbson_encode_null_type } from '../null/jbson-encode-null-type';
import { jbson_encode_f32_type } from '../number/f32/jbson-encode-f32-type';
import { jbson_encode_f64_type } from '../number/f64/jbson-encode-f64-type';
import { jbson_encode_i16_type } from '../number/i16/jbson-encode-i16-type';
import { jbson_encode_i32_type } from '../number/i32/jbson-encode-i32-type';
import { jbson_encode_i64_type } from '../number/i64/jbson-encode-i64-type';
import { jbson_encode_i8_type } from '../number/i8/jbson-encode-i8-type';
import { jbson_encode_u16_type } from '../number/u16/jbson-encode-u16-type';
import { jbson_encode_u32_type } from '../number/u32/jbson-encode-u32-type';
import { jbson_encode_u64_type } from '../number/u64/jbson-encode-u64-type';
import { jbson_encode_u8_type } from '../number/u8/jbson-encode-u8-type';
import { jbson_encode_object_type } from '../object/jbson-encode-object-type';
import { jbson_encode_pointer_type } from '../pointer/jbson-encode-pointer-type';
import { jbson_encode_set_type } from '../set/jbson-encode-set-type';
import { jbson_encode_string_type } from '../string/jbson-encode-string-type';
import { jbson_encode_f32_array_type } from '../typed-array/f32/jbson-encode-f32-array-type';
import { jbson_encode_f64_array_type } from '../typed-array/f64/jbson-encode-f64-array-type';
import { jbson_encode_i16_array_type } from '../typed-array/i16/jbson-encode-i16-array-type';
import { jbson_encode_i32_array_type } from '../typed-array/i32/jbson-encode-i32-array-type';
import { jbson_encode_i64_array_type } from '../typed-array/i64/jbson-encode-i64-array-type';
import { jbson_encode_i8_array_type } from '../typed-array/i8/jbson-encode-i8-array-type';
import { jbson_encode_u16_array_type } from '../typed-array/u16/jbson-encode-u16-array-type';
import { jbson_encode_u32_array_type } from '../typed-array/u32/jbson-encode-u32-array-type';
import { jbson_encode_u64_array_type } from '../typed-array/u64/jbson-encode-u64-array-type';
import { jbson_encode_u8_array_type } from '../typed-array/u8/jbson-encode-u8-array-type';
import { jbson_encode_undefined_type } from '../undefined/jbson-encode-undefined-type';
import { jbson_encode_union_type } from '../union/jbson-encode-union-type';

export function jbson_encode_unknown_type(
  write: WriteFunction,
  type: IUnknownType,
): void {
  if (isAlternativeType(type)) {
    return jbson_encode_alternative_type(write, type);
  } else if (isUnionType(type)) {
    return jbson_encode_union_type(write, type);
  } else if (isUndefinedType(type)) {
    return jbson_encode_undefined_type(write, type);
  } else if (isNullType(type)) {
    return jbson_encode_null_type(write, type);
  } else if (isBooleanType(type)) {
    return jbson_encode_boolean_type(write, type);
  } else if (isU8Type(type)) {
    return jbson_encode_u8_type(write, type);
  } else if (isU16Type(type)) {
    return jbson_encode_u16_type(write, type);
  } else if (isU32Type(type)) {
    return jbson_encode_u32_type(write, type);
  } else if (isU64Type(type)) {
    return jbson_encode_u64_type(write, type);
  } else if (isI8Type(type)) {
    return jbson_encode_i8_type(write, type);
  } else if (isI16Type(type)) {
    return jbson_encode_i16_type(write, type);
  } else if (isI32Type(type)) {
    return jbson_encode_i32_type(write, type);
  } else if (isI64Type(type)) {
    return jbson_encode_i64_type(write, type);
  } else if (isF32Type(type)) {
    return jbson_encode_f32_type(write, type);
  } else if (isF64Type(type)) {
    return jbson_encode_f64_type(write, type);
  } else if (isU8ArrayType(type)) {
    return jbson_encode_u8_array_type(write, type);
  } else if (isU16ArrayType(type)) {
    return jbson_encode_u16_array_type(write, type);
  } else if (isU32ArrayType(type)) {
    return jbson_encode_u32_array_type(write, type);
  } else if (isU64ArrayType(type)) {
    return jbson_encode_u64_array_type(write, type);
  } else if (isI8ArrayType(type)) {
    return jbson_encode_i8_array_type(write, type);
  } else if (isI16ArrayType(type)) {
    return jbson_encode_i16_array_type(write, type);
  } else if (isI32ArrayType(type)) {
    return jbson_encode_i32_array_type(write, type);
  } else if (isI64ArrayType(type)) {
    return jbson_encode_i64_array_type(write, type);
  } else if (isF32ArrayType(type)) {
    return jbson_encode_f32_array_type(write, type);
  } else if (isF64ArrayType(type)) {
    return jbson_encode_f64_array_type(write, type);
  } else if (isBigintType(type)) {
    return jbson_encode_bigint_type(write, type);
  } else if (isStringType(type)) {
    return jbson_encode_string_type(write, type);
  } else if (isArrayType(type)) {
    return jbson_encode_array_type(write, type);
  } else if (isSetType(type)) {
    return jbson_encode_set_type(write, type);
  } else if (isObjectType(type)) {
    return jbson_encode_object_type(write, type);
  } else if (isMapType(type)) {
    return jbson_encode_map_type(write, type);
  } else if (isPointerType(type)) {
    return jbson_encode_pointer_type(write, type);
  } else {
    throw new Error(`Unsupported type`);
  }
}
