import { IU64Type } from '../../../../types/number/u64/u64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_U64, DATA_VIEW_UINT8_ARRAY_U64 } from './data-view-u64.constant';

export function jbson_decode_u64_value_as_bigint(
  read: ReadFunction,
  type: IU64Type,
): bigint {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_U64);
  return DATA_VIEW_U64.getBigInt64(0, true);
}
