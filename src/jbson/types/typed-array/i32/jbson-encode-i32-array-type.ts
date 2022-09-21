import { II32ArrayType } from '../../../../types/typed-array/i32/i32-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I32_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i32_array_type(
  write: WriteFunction,
  type: II32ArrayType,
): void {
  write(I32_ARRAY_TYPE_BYTE);
}
