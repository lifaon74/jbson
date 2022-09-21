import { IStringType } from '../../../types/string/string-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { STRING_TYPE_BYTE } from '../types.constant';

export function jbson_encode_string_type(
  write: WriteFunction,
  type: IStringType,
): void {
  write(STRING_TYPE_BYTE);
}
