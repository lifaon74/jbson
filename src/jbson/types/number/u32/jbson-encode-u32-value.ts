import { IU32Type } from '../../../../types/number/u32/u32-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_U32, DATA_VIEW_UINT8_ARRAY_U32 } from './data-view-u32.constant';

export function jbson_encode_u32_value(
  write: WriteFunction,
  type: IU32Type,
  input: number,
): void {
  DATA_VIEW_U32.setUint32(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_U32);
}
