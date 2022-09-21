import { POINTER_TYPE } from '../../../types/pointer/pointer-type.constant';
import { IPointerType } from '../../../types/pointer/pointer-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_pointer_type(
  read: ReadFunction,
): IPointerType {
  return POINTER_TYPE;
}
