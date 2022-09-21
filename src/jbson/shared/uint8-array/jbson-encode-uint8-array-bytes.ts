import { WriteFunction } from '../write-function/write-function.type';

export function jbson_encode_uint8_array_bytes(
  write: WriteFunction,
  input: Uint8Array,
): void {
  for (let i = 0, l = input.length; i < l; i++) {
    write(input[i]);
  }
}
