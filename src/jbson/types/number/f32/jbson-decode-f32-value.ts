import { IF32Type } from '../../../../types/number/f32/f32-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_F32, DATA_VIEW_UINT8_ARRAY_F32 } from './data-view-f32.constant';

export function jbson_decode_f32_value(
  read: ReadFunction,
  type: IF32Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_F32);
  return DATA_VIEW_F32.getFloat32(0, true);
}
