import { INullType } from '../../../types/null/null-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_null_value(
  read: ReadFunction,
  type: INullType,
): null {
  return null;
}
