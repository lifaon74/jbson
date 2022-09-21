import { IObjectTypeProperty } from '../../../types/object/object-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_utf8_string } from '../../shared/utf8-string/jbson-decode-utf8-string';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_object_type_property(
  read: ReadFunction,
): IObjectTypeProperty {
  return [
    jbson_decode_utf8_string(read),
    jbson_decode_unknown_type(read),
  ];
}
