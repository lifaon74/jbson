import { I64_TYPE } from '../../../../types/number/i64/i64-type.constant';
import { II64ArrayType } from '../../../../types/typed-array/i64/i64-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_i64_value_as_bigint } from '../../number/i64/jbson-decode-i64-value-as-bigint';

export function jbson_decode_i64_array_value(
  read: ReadFunction,
  type: II64ArrayType,
): BigUint64Array {
  const length: number = jbson_decode_size(read);
  const array: BigUint64Array = new BigUint64Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_i64_value_as_bigint(read, I64_TYPE);
  }
  return array;
}
