import { II64Type } from '../../../../types/number/i64/i64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_i64_value_as_bigint } from './jbson-decode-i64-value-as-bigint';

export function jbson_decode_i64_value(
  read: ReadFunction,
  type: II64Type,
): number {
  return Number(jbson_decode_i64_value_as_bigint(read, type));
}


