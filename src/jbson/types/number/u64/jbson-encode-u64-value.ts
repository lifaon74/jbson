import { IU64Type } from '../../../../types/number/u64/u64-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_u64_value_from_bigint } from './jbson-encode-u64-value-from-bigint';

export function jbson_encode_u64_value(
  write: WriteFunction,
  type: IU64Type,
  input: number | bigint,
): void {
  jbson_encode_u64_value_from_bigint(write, type, BigInt(input));
}


