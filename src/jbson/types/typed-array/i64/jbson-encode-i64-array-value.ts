import { I64_TYPE } from '../../../../types/number/i64/i64-type.constant';
import { II64ArrayType } from '../../../../types/typed-array/i64/i64-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_i64_value_from_bigint } from '../../number/i64/jbson-encode-i64-value-from-bigint';

export function jbson_encode_i64_array_value(
  write: WriteFunction,
  type: II64ArrayType,
  input: BigInt64Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_i64_value_from_bigint(write, I64_TYPE, input[i]);
  }
}
