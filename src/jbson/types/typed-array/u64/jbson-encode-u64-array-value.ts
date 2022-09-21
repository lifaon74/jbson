import { U64_TYPE } from '../../../../types/number/u64/u64-type.constant';
import { IU64ArrayType } from '../../../../types/typed-array/u64/u64-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_u64_value_from_bigint } from '../../number/u64/jbson-encode-u64-value-from-bigint';

export function jbson_encode_u64_array_value(
  write: WriteFunction,
  type: IU64ArrayType,
  input: BigUint64Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_u64_value_from_bigint(write, U64_TYPE, input[i]);
  }
}
