import { U16_TYPE } from '../../../../types/number/u16/u16-type.constant';
import { IU16ArrayType } from '../../../../types/typed-array/u16/u16-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_u16_value } from '../../number/u16/jbson-decode-u16-value';

export function jbson_decode_u16_array_value(
  read: ReadFunction,
  type: IU16ArrayType,
): Uint16Array {
  const length: number = jbson_decode_size(read);
  const array: Uint16Array = new Uint16Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_u16_value(read, U16_TYPE);
  }
  return array;
}
