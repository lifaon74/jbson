import { I64_ARRAY_TYPE } from '../../../../types/typed-array/i64/i64-array-type.constant';
import { II64ArrayType } from '../../../../types/typed-array/i64/i64-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i64_array_type(
  read: ReadFunction,
): II64ArrayType {
  return I64_ARRAY_TYPE;
}
