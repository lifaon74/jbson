import { ReadFunction } from '../read-function/read-function.type';

export function jbson_decode_uint8_array_bytes(
  read: ReadFunction,
  output: Uint8Array,
): void {
  for (let i = 0, l = output.length; i < l; i++) {
    output[i] = read();
  }
}
