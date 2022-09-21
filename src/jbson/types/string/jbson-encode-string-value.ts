import { IStringType } from '../../../types/string/string-type.type';
import { jbson_encode_utf8_string } from '../../shared/utf8-string/jbson-encode-utf8-string';
import { WriteFunction } from '../../shared/write-function/write-function.type';

export function jbson_encode_string_value(
  write: WriteFunction,
  type: IStringType,
  input: string,
): void {
  jbson_encode_utf8_string(write, input);
}
