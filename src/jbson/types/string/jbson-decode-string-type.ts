import { STRING_TYPE } from '../../../types/string/string-type.constant';
import { IStringType } from '../../../types/string/string-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_string_type(
  read: ReadFunction,
): IStringType {
  return STRING_TYPE;
}
