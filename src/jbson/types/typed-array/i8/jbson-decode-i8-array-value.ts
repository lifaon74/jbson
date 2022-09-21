import { II8ArrayType } from '../../../../types/typed-array/i8/i8-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array } from '../../../shared/uint8-array/jbson-decode-uint8-array';

export function jbson_decode_i8_array_value(
  read: ReadFunction,
  type: II8ArrayType,
): Int8Array {
  const data: Uint8Array = jbson_decode_uint8_array(read);
  return new Int8Array(data.buffer, data.byteOffset, data.byteLength);
}
