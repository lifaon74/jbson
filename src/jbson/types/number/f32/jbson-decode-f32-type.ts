import { F32_TYPE } from '../../../../types/number/f32/f32-type.constant';
import { IF32Type } from '../../../../types/number/f32/f32-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_f32_type(
  read: ReadFunction,
): IF32Type {
  return F32_TYPE;
}
