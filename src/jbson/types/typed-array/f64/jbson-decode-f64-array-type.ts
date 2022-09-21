import { F64_ARRAY_TYPE } from '../../../../types/typed-array/f64/f64-array-type.constant';
import { IF64ArrayType } from '../../../../types/typed-array/f64/f64-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_f64_array_type(
  read: ReadFunction,
): IF64ArrayType {
  return F64_ARRAY_TYPE;
}
