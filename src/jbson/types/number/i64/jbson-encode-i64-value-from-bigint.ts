import { II64Type } from '../../../../types/number/i64/i64-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_I64, DATA_VIEW_UINT8_ARRAY_I64 } from './data-view-i64.constant';

export function jbson_encode_i64_value_from_bigint(
  write: WriteFunction,
  type: II64Type,
  input: bigint,
): void {
  DATA_VIEW_I64.setBigInt64(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_I64);
}
