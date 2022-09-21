import { IU64Type } from '../../../../types/number/u64/u64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_u64_value_as_bigint } from './jbson-decode-u64-value-as-bigint';

export function jbson_decode_u64_value(
  read: ReadFunction,
  type: IU64Type,
): number {
  return Number(jbson_decode_u64_value_as_bigint(read, type));
}


