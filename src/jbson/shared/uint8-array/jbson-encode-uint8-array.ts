import { jbson_encode_size } from '../size/jbson-encode-size';
import { WriteFunction } from '../write-function/write-function.type';
import { jbson_encode_uint8_array_bytes } from './jbson-encode-uint8-array-bytes';

export function jbson_encode_uint8_array(
  write: WriteFunction,
  input: Uint8Array,
): void {
  jbson_encode_size(write, input.length);
  jbson_encode_uint8_array_bytes(write, input);
}
