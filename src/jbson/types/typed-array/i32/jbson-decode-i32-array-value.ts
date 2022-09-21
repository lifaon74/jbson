import { I32_TYPE } from '../../../../types/number/i32/i32-type.constant';
import { II32ArrayType } from '../../../../types/typed-array/i32/i32-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_i32_value } from '../../number/i32/jbson-decode-i32-value';

export function jbson_decode_i32_array_value(
  read: ReadFunction,
  type: II32ArrayType,
): Uint32Array {
  const length: number = jbson_decode_size(read);
  const array: Uint32Array = new Uint32Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_i32_value(read, I32_TYPE);
  }
  return array;
}
