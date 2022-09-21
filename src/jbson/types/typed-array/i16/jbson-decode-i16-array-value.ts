import { I16_TYPE } from '../../../../types/number/i16/i16-type.constant';
import { II16ArrayType } from '../../../../types/typed-array/i16/i16-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_i16_value } from '../../number/i16/jbson-decode-i16-value';

export function jbson_decode_i16_array_value(
  read: ReadFunction,
  type: II16ArrayType,
): Uint16Array {
  const length: number = jbson_decode_size(read);
  const array: Uint16Array = new Uint16Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_i16_value(read, I16_TYPE);
  }
  return array;
}
