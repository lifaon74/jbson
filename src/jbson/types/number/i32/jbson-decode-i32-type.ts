import { I32_TYPE } from '../../../../types/number/i32/i32-type.constant';
import { II32Type } from '../../../../types/number/i32/i32-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i32_type(
  read: ReadFunction,
): II32Type {
  return I32_TYPE;
}
