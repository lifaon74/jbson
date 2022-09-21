import { IU64Type } from '../../../../types/number/u64/u64-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_U64, DATA_VIEW_UINT8_ARRAY_U64 } from './data-view-u64.constant';

export function jbson_encode_u64_value_from_bigint(
  write: WriteFunction,
  type: IU64Type,
  input: bigint,
): void {
  DATA_VIEW_U64.setBigInt64(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_U64);
}
