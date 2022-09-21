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
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_array_value } from '../array/jbson-decode-array-value';
import { jbson_decode_bigint_value } from '../bigint/jbson-decode-bigint-value';
import { jbson_decode_boolean_value } from '../boolean/jbson-decode-boolean-value';
import { jbson_decode_map_value } from '../map/jbson-decode-map-value';
import { jbson_decode_null_value } from '../null/jbson-decode-null-value';
import { jbson_decode_f32_value } from '../number/f32/jbson-decode-f32-value';
import { jbson_decode_f64_value } from '../number/f64/jbson-decode-f64-value';
import { jbson_decode_i16_value } from '../number/i16/jbson-decode-i16-value';
import { jbson_decode_i32_value } from '../number/i32/jbson-decode-i32-value';
import { jbson_decode_i64_value } from '../number/i64/jbson-decode-i64-value';
import { jbson_decode_i8_value } from '../number/i8/jbson-decode-i8-value';
import { jbson_decode_u16_value } from '../number/u16/jbson-decode-u16-value';
import { jbson_decode_u32_value } from '../number/u32/jbson-decode-u32-value';
import { jbson_decode_u64_value } from '../number/u64/jbson-decode-u64-value';
import { jbson_decode_u8_value } from '../number/u8/jbson-decode-u8-value';
import { jbson_decode_object_value } from '../object/jbson-decode-object-value';
import { jbson_decode_pointer_value } from '../pointer/jbson-decode-pointer-value';
import { jbson_decode_set_value } from '../set/jbson-decode-set-value';
import { jbson_decode_string_value } from '../string/jbson-decode-string-value';
import { jbson_decode_f32_array_value } from '../typed-array/f32/jbson-decode-f32-array-value';
import { jbson_decode_f64_array_value } from '../typed-array/f64/jbson-decode-f64-array-value';
import { jbson_decode_i16_array_value } from '../typed-array/i16/jbson-decode-i16-array-value';
import { jbson_decode_i32_array_value } from '../typed-array/i32/jbson-decode-i32-array-value';
import { jbson_decode_i64_array_value } from '../typed-array/i64/jbson-decode-i64-array-value';
import { jbson_decode_i8_array_value } from '../typed-array/i8/jbson-decode-i8-array-value';
import { jbson_decode_u16_array_value } from '../typed-array/u16/jbson-decode-u16-array-value';
import { jbson_decode_u32_array_value } from '../typed-array/u32/jbson-decode-u32-array-value';
import { jbson_decode_u64_array_value } from '../typed-array/u64/jbson-decode-u64-array-value';
import { jbson_decode_u8_array_value } from '../typed-array/u8/jbson-decode-u8-array-value';
import { jbson_decode_undefined_value } from '../undefined/jbson-decode-undefined-value';
import { jbson_decode_union_value } from '../union/jbson-decode-union-value';

export function jbson_decode_unknown_value(
  read: ReadFunction,
  type: IUnknownType,
  pointerMap: PointerMap,
): unknown {
  if (isUnionType(type)) {
    return jbson_decode_union_value(read, type, pointerMap);
  } else if (isUndefinedType(type)) {
    return jbson_decode_undefined_value(read, type);
  } else if (isNullType(type)) {
    return jbson_decode_null_value(read, type);
  } else if (isBooleanType(type)) {
    return jbson_decode_boolean_value(read, type);
  } else if (isU8Type(type)) {
    return jbson_decode_u8_value(read, type);
  } else if (isU16Type(type)) {
    return jbson_decode_u16_value(read, type);
  } else if (isU32Type(type)) {
    return jbson_decode_u32_value(read, type);
  } else if (isU64Type(type)) {
    return jbson_decode_u64_value(read, type);
  } else if (isI8Type(type)) {
    return jbson_decode_i8_value(read, type);
  } else if (isI16Type(type)) {
    return jbson_decode_i16_value(read, type);
  } else if (isI32Type(type)) {
    return jbson_decode_i32_value(read, type);
  } else if (isI64Type(type)) {
    return jbson_decode_i64_value(read, type);
  } else if (isF32Type(type)) {
    return jbson_decode_f32_value(read, type);
  } else if (isF64Type(type)) {
    return jbson_decode_f64_value(read, type);
  } else if (isU8ArrayType(type)) {
    return jbson_decode_u8_array_value(read, type);
  } else if (isU16ArrayType(type)) {
    return jbson_decode_u16_array_value(read, type);
  } else if (isU32ArrayType(type)) {
    return jbson_decode_u32_array_value(read, type);
  } else if (isU64ArrayType(type)) {
    return jbson_decode_u64_array_value(read, type);
  } else if (isI8ArrayType(type)) {
    return jbson_decode_i8_array_value(read, type);
  } else if (isI16ArrayType(type)) {
    return jbson_decode_i16_array_value(read, type);
  } else if (isI32ArrayType(type)) {
    return jbson_decode_i32_array_value(read, type);
  } else if (isI64ArrayType(type)) {
    return jbson_decode_i64_array_value(read, type);
  } else if (isF32ArrayType(type)) {
    return jbson_decode_f32_array_value(read, type);
  } else if (isF64ArrayType(type)) {
    return jbson_decode_f64_array_value(read, type);
  } else if (isBigintType(type)) {
    return jbson_decode_bigint_value(read, type);
  } else if (isStringType(type)) {
    return jbson_decode_string_value(read, type);
  } else if (isArrayType(type)) {
    return jbson_decode_array_value(read, type, pointerMap);
  } else if (isSetType(type)) {
    return jbson_decode_set_value(read, type, pointerMap);
  } else if (isObjectType(type)) {
    return jbson_decode_object_value(read, type, pointerMap);
  } else if (isMapType(type)) {
    return jbson_decode_map_value(read, type, pointerMap);
  } else if (isPointerType(type)) {
    return jbson_decode_pointer_value(read, type, pointerMap);
  } else {
    throw new Error(`Unsupported type`);
  }
}
