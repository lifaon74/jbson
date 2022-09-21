import { IF64Type } from '../../../../types/number/f64/f64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_F64, DATA_VIEW_UINT8_ARRAY_F64 } from './data-view-f64.constant';

export function jbson_decode_f64_value(
  read: ReadFunction,
  type: IF64Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_F64);
  return DATA_VIEW_F64.getFloat64(0, true);
}
