import { II64Type } from '../../../../types/number/i64/i64-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_i64_value_from_bigint } from './jbson-encode-i64-value-from-bigint';

export function jbson_encode_i64_value(
  write: WriteFunction,
  type: II64Type,
  input: number | bigint,
): void {
  jbson_encode_i64_value_from_bigint(write, type, BigInt(input));
}


