import { IStringType } from '../../../types/string/string-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_utf8_string } from '../../shared/utf8-string/jbson-decode-utf8-string';

export function jbson_decode_string_value(
  read: ReadFunction,
  type: IStringType,
): string {
  return jbson_decode_utf8_string(read);
}
