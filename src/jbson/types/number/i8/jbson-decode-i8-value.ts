import { II8Type } from '../../../../types/number/i8/i8-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_I8, DATA_VIEW_UINT8_ARRAY_I8 } from './data-view-i8.constant';

export function jbson_decode_i8_value(
  read: ReadFunction,
  type: II8Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_I8);
  return DATA_VIEW_I8.getInt8(0);
}
