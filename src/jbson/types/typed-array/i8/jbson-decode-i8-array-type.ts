import { I8_ARRAY_TYPE } from '../../../../types/typed-array/i8/i8-array-type.constant';
import { II8ArrayType } from '../../../../types/typed-array/i8/i8-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i8_array_type(
  read: ReadFunction,
): II8ArrayType {
  return I8_ARRAY_TYPE;
}
