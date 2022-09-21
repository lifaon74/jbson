import { I16_ARRAY_TYPE } from '../../../../types/typed-array/i16/i16-array-type.constant';
import { II16ArrayType } from '../../../../types/typed-array/i16/i16-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i16_array_type(
  read: ReadFunction,
): II16ArrayType {
  return I16_ARRAY_TYPE;
}
