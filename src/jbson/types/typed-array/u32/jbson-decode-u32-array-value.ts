import { U32_TYPE } from '../../../../types/number/u32/u32-type.constant';
import { IU32ArrayType } from '../../../../types/typed-array/u32/u32-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../../shared/size/jbson-decode-size';
import { jbson_decode_u32_value } from '../../number/u32/jbson-decode-u32-value';

export function jbson_decode_u32_array_value(
  read: ReadFunction,
  type: IU32ArrayType,
): Uint32Array {
  const length: number = jbson_decode_size(read);
  const array: Uint32Array = new Uint32Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = jbson_decode_u32_value(read, U32_TYPE);
  }
  return array;
}
