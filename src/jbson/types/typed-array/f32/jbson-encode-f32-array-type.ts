import { IF32ArrayType } from '../../../../types/typed-array/f32/f32-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { F32_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_f32_array_type(
  write: WriteFunction,
  type: IF32ArrayType,
): void {
  write(F32_ARRAY_TYPE_BYTE);
}
