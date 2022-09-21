import { II16Type } from '../../../../types/number/i16/i16-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_I16, DATA_VIEW_UINT8_ARRAY_I16 } from './data-view-i16.constant';

export function jbson_decode_i16_value(
  read: ReadFunction,
  type: II16Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_I16);
  return DATA_VIEW_I16.getInt16(0, true);
}
