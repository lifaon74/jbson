import { IF32Type } from '../../../../types/number/f32/f32-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_F32, DATA_VIEW_UINT8_ARRAY_F32 } from './data-view-f32.constant';

export function jbson_encode_f32_value(
  write: WriteFunction,
  type: IF32Type,
  input: number,
): void {
  DATA_VIEW_F32.setFloat32(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_F32);
}
