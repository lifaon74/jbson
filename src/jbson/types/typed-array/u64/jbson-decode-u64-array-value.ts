import { U64_TYPE } from '../../../../types/number/u64/u64-type.constant';
import { IU64ArrayType } from '../../../../types/typed-array/u64/u64-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_u64_value_as_bigint } from '../../number/u64/jbson-decode-u64-value-as-bigint';

export function jbson_decode_u64_array_value(
  read: ReadFunction,
  type: IU64ArrayType,
): BigUint64Array {
  const length: number = jbson_decode_size(read);
  const array: BigUint64Array = new BigUint64Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_u64_value_as_bigint(read, U64_TYPE);
  }
  return array;
}
