import { NULL_TYPE } from '../../../types/null/null-type.constant';
import { INullType } from '../../../types/null/null-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_null_type(
  read: ReadFunction,
): INullType {
  return NULL_TYPE;
}
