import { UNDEFINED_TYPE } from '../../../types/undefined/undefined-type.constant';
import { IUndefinedType } from '../../../types/undefined/undefined-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_undefined_type(
  read: ReadFunction,
): IUndefinedType {
  return UNDEFINED_TYPE;
}
