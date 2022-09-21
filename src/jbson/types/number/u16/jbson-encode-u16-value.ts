import { IU16Type } from '../../../../types/number/u16/u16-type.type';
import { jbson_encode_uint8_array_bytes } from '../../../shared/uint8-array/jbson-encode-uint8-array-bytes';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { DATA_VIEW_U16, DATA_VIEW_UINT8_ARRAY_U16 } from './data-view-u16.constant';

export function jbson_encode_u16_value(
  write: WriteFunction,
  type: IU16Type,
  input: number,
): void {
  DATA_VIEW_U16.setUint16(0, input, true);
  jbson_encode_uint8_array_bytes(write, DATA_VIEW_UINT8_ARRAY_U16);
}
