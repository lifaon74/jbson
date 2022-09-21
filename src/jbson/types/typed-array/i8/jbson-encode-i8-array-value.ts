import { II8ArrayType } from '../../../../types/typed-array/i8/i8-array-type.type';
import { jbson_encode_uint8_array } from '../../../shared/uint8-array/jbson-encode-uint8-array';
import { WriteFunction } from '../../../shared/write-function/write-function.type';

export function jbson_encode_i8_array_value(
  write: WriteFunction,
  type: II8ArrayType,
  input: Int8Array,
): void {
  jbson_encode_uint8_array(write, new Uint8Array(input.buffer, input.byteOffset, input.byteLength));
}
