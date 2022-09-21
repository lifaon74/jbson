import { IU8ArrayType } from '../../../../types/typed-array/u8/u8-array-type.type';
import { jbson_encode_uint8_array } from '../../../shared/uint8-array/jbson-encode-uint8-array';
import { WriteFunction } from '../../../shared/write-function/write-function.type';

export function jbson_encode_u8_array_value(
  write: WriteFunction,
  type: IU8ArrayType,
  input: Uint8Array,
): void {
  jbson_encode_uint8_array(write, input);
}
