import { IF32Type } from '../../../../types/number/f32/f32-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { F32_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_f32_type(
  write: WriteFunction,
  type: IF32Type,
): void {
  write(F32_TYPE_BYTE);
}
