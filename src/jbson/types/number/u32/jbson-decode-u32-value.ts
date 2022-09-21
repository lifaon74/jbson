import { IU32Type } from '../../../../types/number/u32/u32-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_U32, DATA_VIEW_UINT8_ARRAY_U32 } from './data-view-u32.constant';

export function jbson_decode_u32_value(
  read: ReadFunction,
  type: IU32Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_U32);
  return DATA_VIEW_U32.getUint32(0, true);
}
