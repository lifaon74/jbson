import { F64_TYPE } from '../../../../types/number/f64/f64-type.constant';
import { IF64ArrayType } from '../../../../types/typed-array/f64/f64-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_f64_value } from '../../number/f64/jbson-decode-f64-value';

export function jbson_decode_f64_array_value(
  read: ReadFunction,
  type: IF64ArrayType,
): Uint32Array {
  const length: number = jbson_decode_size(read);
  const array: Uint32Array = new Uint32Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_f64_value(read, F64_TYPE);
  }
  return array;
}
