import { ISetType } from '../../../types/set/set-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { SET_TYPE_BYTE } from '../types.constant';
import { jbson_encode_unknown_type } from '../unknown/jbson-encode-unknown-type';

export function jbson_encode_set_type(
  write: WriteFunction,
  type: ISetType,
): void {
  write(SET_TYPE_BYTE);
  jbson_encode_unknown_type(write, type.itemsType);
}
