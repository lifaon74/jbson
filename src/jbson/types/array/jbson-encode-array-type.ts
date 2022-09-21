import { IArrayType } from '../../../types/array/array-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { ARRAY_TYPE_BYTE } from '../types.constant';
import { jbson_encode_unknown_type } from '../unknown/jbson-encode-unknown-type';

export function jbson_encode_array_type(
  write: WriteFunction,
  type: IArrayType,
): void {
  write(ARRAY_TYPE_BYTE);
  jbson_encode_unknown_type(write, type.itemsType);
}
