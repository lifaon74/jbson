import { II16Type } from '../../../../types/number/i16/i16-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_I16, DATA_VIEW_UINT8_ARRAY_I16 } from './data-view-i16.constant';

export function jbson_encode_i16_value(
  write: WriteFunction,
  type: II16Type,
  input: number,
): void {
  DATA_VIEW_I16.setInt16(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_I16);
}
