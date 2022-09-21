import { IUnknownType } from '../../../types/unknown/unknown-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_array_type } from '../array/jbson-decode-array-type';
import { jbson_decode_bigint_type } from '../bigint/jbson-decode-bigint-type';
import { jbson_decode_bigint_value } from '../bigint/jbson-decode-bigint-value';
import { jbson_decode_boolean_type } from '../boolean/jbson-decode-boolean-type';
import { jbson_decode_map_type } from '../map/jbson-decode-map-type';
import { jbson_decode_null_type } from '../null/jbson-decode-null-type';
import { jbson_decode_f32_type } from '../number/f32/jbson-decode-f32-type';
import { jbson_decode_f64_type } from '../number/f64/jbson-decode-f64-type';
import { jbson_decode_i16_type } from '../number/i16/jbson-decode-i16-type';
import { jbson_decode_i32_type } from '../number/i32/jbson-decode-i32-type';
import { jbson_decode_i64_type } from '../number/i64/jbson-decode-i64-type';
import { jbson_decode_i8_type } from '../number/i8/jbson-decode-i8-type';
import { jbson_decode_u16_type } from '../number/u16/jbson-decode-u16-type';
import { jbson_decode_u32_type } from '../number/u32/jbson-decode-u32-type';
import { jbson_decode_u64_type } from '../number/u64/jbson-decode-u64-type';
import { jbson_decode_u8_type } from '../number/u8/jbson-decode-u8-type';
import { jbson_decode_object_type } from '../object/jbson-decode-object-type';
import { jbson_decode_pointer_type } from '../pointer/jbson-decode-pointer-type';
import { jbson_decode_set_type } from '../set/jbson-decode-set-type';
import { jbson_decode_string_type } from '../string/jbson-decode-string-type';
import { jbson_decode_f32_array_type } from '../typed-array/f32/jbson-decode-f32-array-type';
import { jbson_decode_f64_array_type } from '../typed-array/f64/jbson-decode-f64-array-type';
import { jbson_decode_i16_array_type } from '../typed-array/i16/jbson-decode-i16-array-type';
import { jbson_decode_i32_array_type } from '../typed-array/i32/jbson-decode-i32-array-type';
import { jbson_decode_i64_array_type } from '../typed-array/i64/jbson-decode-i64-array-type';
import { jbson_decode_i8_array_type } from '../typed-array/i8/jbson-decode-i8-array-type';
import { jbson_decode_u16_array_type } from '../typed-array/u16/jbson-decode-u16-array-type';
import { jbson_decode_u32_array_type } from '../typed-array/u32/jbson-decode-u32-array-type';
import { jbson_decode_u64_array_type } from '../typed-array/u64/jbson-decode-u64-array-type';
import { jbson_decode_u8_array_type } from '../typed-array/u8/jbson-decode-u8-array-type';
import {
  ARRAY_TYPE_BYTE, BIGINT_TYPE_BYTE,
  BOOLEAN_TYPE_BYTE,
  F32_ARRAY_TYPE_BYTE, F32_TYPE_BYTE,
  F64_ARRAY_TYPE_BYTE,
  F64_TYPE_BYTE,
  I16_ARRAY_TYPE_BYTE,
  I16_TYPE_BYTE,
  I32_ARRAY_TYPE_BYTE,
  I32_TYPE_BYTE,
  I64_ARRAY_TYPE_BYTE, I64_TYPE_BYTE,
  I8_ARRAY_TYPE_BYTE,
  I8_TYPE_BYTE,
  MAP_TYPE_BYTE,
  NULL_TYPE_BYTE,
  OBJECT_TYPE_BYTE,
  POINTER_TYPE_BYTE,
  SET_TYPE_BYTE,
  STRING_TYPE_BYTE,
  U16_ARRAY_TYPE_BYTE,
  U16_TYPE_BYTE,
  U32_ARRAY_TYPE_BYTE,
  U32_TYPE_BYTE,
  U64_ARRAY_TYPE_BYTE, U64_TYPE_BYTE,
  U8_ARRAY_TYPE_BYTE,
  U8_TYPE_BYTE,
  UNDEFINED_TYPE_BYTE,
  UNION_TYPE_BYTE,
} from '../types.constant';
import { jbson_decode_undefined_type } from '../undefined/jbson-decode-undefined-type';
import { jbson_decode_union_type } from '../union/jbson-decode-union-type';

export function jbson_decode_unknown_type(
  read: ReadFunction,
): IUnknownType {
  const typeByte: number = read();
  if (typeByte === UNION_TYPE_BYTE) {
    return jbson_decode_union_type(read);
  } else if (typeByte === UNDEFINED_TYPE_BYTE) {
    return jbson_decode_undefined_type(read);
  } else if (typeByte === NULL_TYPE_BYTE) {
    return jbson_decode_null_type(read);
  } else if (typeByte === BOOLEAN_TYPE_BYTE) {
    return jbson_decode_boolean_type(read);
  } else if (typeByte === U8_TYPE_BYTE) {
    return jbson_decode_u8_type(read);
  } else if (typeByte === U16_TYPE_BYTE) {
    return jbson_decode_u16_type(read);
  } else if (typeByte === U32_TYPE_BYTE) {
    return jbson_decode_u32_type(read);
  } else if (typeByte === U64_TYPE_BYTE) {
    return jbson_decode_u64_type(read);
  } else if (typeByte === I8_TYPE_BYTE) {
    return jbson_decode_i8_type(read);
  } else if (typeByte === I16_TYPE_BYTE) {
    return jbson_decode_i16_type(read);
  } else if (typeByte === I32_TYPE_BYTE) {
    return jbson_decode_i32_type(read);
  } else if (typeByte === I64_TYPE_BYTE) {
    return jbson_decode_i64_type(read);
  } else if (typeByte === F32_TYPE_BYTE) {
    return jbson_decode_f32_type(read);
  } else if (typeByte === F64_TYPE_BYTE) {
    return jbson_decode_f64_type(read);
  } else if (typeByte === U8_ARRAY_TYPE_BYTE) {
    return jbson_decode_u8_array_type(read);
  } else if (typeByte === U16_ARRAY_TYPE_BYTE) {
    return jbson_decode_u16_array_type(read);
  } else if (typeByte === U32_ARRAY_TYPE_BYTE) {
    return jbson_decode_u32_array_type(read);
  } else if (typeByte === U64_ARRAY_TYPE_BYTE) {
    return jbson_decode_u64_array_type(read);
  } else if (typeByte === I8_ARRAY_TYPE_BYTE) {
    return jbson_decode_i8_array_type(read);
  } else if (typeByte === I16_ARRAY_TYPE_BYTE) {
    return jbson_decode_i16_array_type(read);
  } else if (typeByte === I32_ARRAY_TYPE_BYTE) {
    return jbson_decode_i32_array_type(read);
  } else if (typeByte === I64_ARRAY_TYPE_BYTE) {
    return jbson_decode_i64_array_type(read);
  } else if (typeByte === F32_ARRAY_TYPE_BYTE) {
    return jbson_decode_f32_array_type(read);
  } else if (typeByte === F64_ARRAY_TYPE_BYTE) {
    return jbson_decode_f64_array_type(read);
  } else if (typeByte === BIGINT_TYPE_BYTE) {
    return jbson_decode_bigint_type(read);
  } else if (typeByte === STRING_TYPE_BYTE) {
    return jbson_decode_string_type(read);
  } else if (typeByte === ARRAY_TYPE_BYTE) {
    return jbson_decode_array_type(read);
  } else if (typeByte === SET_TYPE_BYTE) {
    return jbson_decode_set_type(read);
  } else if (typeByte === OBJECT_TYPE_BYTE) {
    return jbson_decode_object_type(read);
  } else if (typeByte === MAP_TYPE_BYTE) {
    return jbson_decode_map_type(read);
  } else if (typeByte === POINTER_TYPE_BYTE) {
    return jbson_decode_pointer_type(read);
  } else {
    throw new Error(`Unsupported type`);
  }
}
