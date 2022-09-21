import { II64Type } from '../../../../types/number/i64/i64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_I64, DATA_VIEW_UINT8_ARRAY_I64 } from './data-view-i64.constant';

export function jbson_decode_i64_value_as_bigint(
  read: ReadFunction,
  type: II64Type,
): bigint {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_I64);
  return DATA_VIEW_I64.getBigInt64(0, true);
}
