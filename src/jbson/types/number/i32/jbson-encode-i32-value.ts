import { II32Type } from '../../../../types/number/i32/i32-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_I32, DATA_VIEW_UINT8_ARRAY_I32 } from './data-view-i32.constant';

export function jbson_encode_i32_value(
  write: WriteFunction,
  type: II32Type,
  input: number,
): void {
  DATA_VIEW_I32.setInt32(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_I32);
}
