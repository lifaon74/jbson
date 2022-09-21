import { II8Type } from '../../../../types/number/i8/i8-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_I8, DATA_VIEW_UINT8_ARRAY_I8 } from './data-view-i8.constant';

export function jbson_encode_i8_value(
  write: WriteFunction,
  type: II8Type,
  input: number,
): void {
  DATA_VIEW_I8.setInt8(0, input);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_I8);
}
