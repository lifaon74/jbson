import { IPointerType } from '../../../types/pointer/pointer-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { POINTER_TYPE_BYTE } from '../types.constant';

export function jbson_encode_pointer_type(
  write: WriteFunction,
  type: IPointerType,
): void {
  write(POINTER_TYPE_BYTE);
}
