import { IBooleanType } from '../../../types/boolean/boolean-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';

export function jbson_encode_boolean_value(
  write: WriteFunction,
  type: IBooleanType,
  input: boolean,
): void {
  write(input ? 1 : 0);
}
