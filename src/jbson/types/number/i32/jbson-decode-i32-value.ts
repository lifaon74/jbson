import { II32Type } from '../../../../types/number/i32/i32-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_I32, DATA_VIEW_UINT8_ARRAY_I32 } from './data-view-i32.constant';

export function jbson_decode_i32_value(
  read: ReadFunction,
  type: II32Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_I32);
  return DATA_VIEW_I32.getInt32(0, true);
}
