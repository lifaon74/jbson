import { IBooleanType } from '../../../types/boolean/boolean-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_boolean_value(
  read: ReadFunction,
  type: IBooleanType,
): boolean {
  return (read() !== 0);
}
