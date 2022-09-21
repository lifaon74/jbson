import { IU8Type } from '../../../../types/number/u8/u8-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_U8, DATA_VIEW_UINT8_ARRAY_U8 } from './data-view-u8.constant';

export function jbson_decode_u8_value(
  read: ReadFunction,
  type: IU8Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_U8);
  return DATA_VIEW_U8.getUint8(0);
}
