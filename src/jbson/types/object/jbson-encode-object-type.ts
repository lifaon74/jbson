import { IObjectType } from '../../../types/object/object-type.type';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { OBJECT_TYPE_BYTE } from '../types.constant';
import { jbson_encode_object_type_property } from './jbson-encode-object-type-property';

export function jbson_encode_object_type(
  write: WriteFunction,
  type: IObjectType,
): void {
  write(OBJECT_TYPE_BYTE);
  const length: number = type.properties.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_object_type_property(write, type.properties[i]);
  }
}
