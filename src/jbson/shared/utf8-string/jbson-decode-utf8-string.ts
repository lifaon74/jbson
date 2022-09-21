import { ReadFunction } from '../read-function/read-function.type';
import { jbson_decode_uint8_array } from '../uint8-array/jbson-decode-uint8-array';

export function jbson_decode_utf8_string(
  read: ReadFunction,
): string {
  return new TextDecoder().decode(jbson_decode_uint8_array(read));
}
