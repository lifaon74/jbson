import { F32_ARRAY_TYPE } from '../../../../types/typed-array/f32/f32-array-type.constant';
import { IF32ArrayType } from '../../../../types/typed-array/f32/f32-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_f32_array_type(
  read: ReadFunction,
): IF32ArrayType {
  return F32_ARRAY_TYPE;
}
