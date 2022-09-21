import { I16_TYPE } from '../../../../types/number/i16/i16-type.constant';
import { II16Type } from '../../../../types/number/i16/i16-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_i16_type(
  read: ReadFunction,
): II16Type {
  return I16_TYPE;
}
