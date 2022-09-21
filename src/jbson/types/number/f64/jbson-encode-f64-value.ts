import { IF64Type } from '../../../../types/number/f64/f64-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_F64, DATA_VIEW_UINT8_ARRAY_F64 } from './data-view-f64.constant';

export function jbson_encode_f64_value(
  write: WriteFunction,
  type: IF64Type,
  input: number,
): void {
  DATA_VIEW_F64.setFloat64(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_F64);
}
