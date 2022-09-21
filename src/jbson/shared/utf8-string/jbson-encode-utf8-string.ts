import { jbson_encode_uint8_array } from '../uint8-array/jbson-encode-uint8-array';
import { WriteFunction } from '../write-function/write-function.type';

export function jbson_encode_utf8_string(
  write: WriteFunction,
  input: string,
): void {
  jbson_encode_uint8_array(write, new TextEncoder().encode(input));
}
