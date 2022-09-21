import { F32_TYPE } from '../../../../types/number/f32/f32-type.constant';
import { IF32ArrayType } from '../../../../types/typed-array/f32/f32-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_f32_value } from '../../number/f32/jbson-decode-f32-value';

export function jbson_decode_f32_array_value(
  read: ReadFunction,
  type: IF32ArrayType,
): Uint32Array {
  const length: number = jbson_decode_size(read);
  const array: Uint32Array = new Uint32Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_f32_value(read, F32_TYPE);
  }
  return array;
}
