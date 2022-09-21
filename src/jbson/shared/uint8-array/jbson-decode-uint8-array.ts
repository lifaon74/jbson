import { ReadFunction } from '../read-function/read-function.type';
import { jbson_decode_size } from '../size/jbson-decode-size';
import { jbson_decode_uint8_array_bytes } from './jbson-decode-uint8-array-bytes';

export function jbson_decode_uint8_array(
  read: ReadFunction,
): Uint8Array {
  const size: number = jbson_decode_size(read);
  const output: Uint8Array = new Uint8Array(size);
  jbson_decode_uint8_array_bytes(read, output);
  return output;
}
