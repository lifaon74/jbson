import { F64_TYPE } from '../../../../types/number/f64/f64-type.constant';
import { IF64Type } from '../../../../types/number/f64/f64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_f64_type(
  read: ReadFunction,
): IF64Type {
  return F64_TYPE;
}
