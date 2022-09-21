import { IU8ArrayType } from '../../../../types/typed-array/u8/u8-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array } from '../../../shared/uint8-array/jbson-decode-uint8-array';

export function jbson_decode_u8_array_value(
  read: ReadFunction,
  type: IU8ArrayType,
): Uint8Array {
  return jbson_decode_uint8_array(read);
}
