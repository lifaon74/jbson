import { IU16Type } from '../../../../types/number/u16/u16-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';
import { jbson_decode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-decode-uint8-array-bytes';
import { DATA_VIEW_U16, DATA_VIEW_UINT8_ARRAY_U16 } from './data-view-u16.constant';

export function jbson_decode_u16_value(
  read: ReadFunction,
  type: IU16Type,
): number {
  jbson_decode_uint8_array_bytes(read, DATA_VIEW_UINT8_ARRAY_U16);
  return DATA_VIEW_U16.getUint16(0, true);
}
