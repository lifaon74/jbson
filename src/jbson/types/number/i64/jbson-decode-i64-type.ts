import { I64_TYPE } from '../../../../types/number/i64/i64-type.constant';
import { II64Type } from '../../../../types/number/i64/i64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i64_type(
  read: ReadFunction,
): II64Type {
  return I64_TYPE;
}
