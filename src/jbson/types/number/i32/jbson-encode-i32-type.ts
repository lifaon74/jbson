import { II32Type } from '../../../../types/number/i32/i32-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I32_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i32_type(
  write: WriteFunction,
  type: II32Type,
): void {
  write(I32_TYPE_BYTE);
}
