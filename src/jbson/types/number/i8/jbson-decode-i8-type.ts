import { I8_TYPE } from '../../../../types/number/i8/i8-type.constant';
import { II8Type } from '../../../../types/number/i8/i8-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i8_type(
  read: ReadFunction,
): II8Type {
  return I8_TYPE;
}
