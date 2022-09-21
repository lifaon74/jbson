import { I32_ARRAY_TYPE } from '../../../../types/typed-array/i32/i32-array-type.constant';
import { II32ArrayType } from '../../../../types/typed-array/i32/i32-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i32_array_type(
  read: ReadFunction,
): II32ArrayType {
  return I32_ARRAY_TYPE;
}
