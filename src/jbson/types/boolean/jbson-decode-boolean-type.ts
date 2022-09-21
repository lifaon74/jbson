import { BOOLEAN_TYPE } from '../../../types/boolean/boolean-type.constant';
import { IBooleanType } from '../../../types/boolean/boolean-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_boolean_type(
  read: ReadFunction,
): IBooleanType {
  return BOOLEAN_TYPE;
}
