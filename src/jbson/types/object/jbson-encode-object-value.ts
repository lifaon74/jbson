import { IObjectType } from '../../../types/object/object-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_object_value_property } from './jbson-encode-object-value-property';

export function jbson_encode_object_value(
  write: WriteFunction,
  type: IObjectType,
  input: object,
  pointerMap: PointerMap,
): void {
  pointerMap.add(input);
  const length: number = type.properties.length;
  for (let i = 0; i < length; i++) {
    jbson_encode_object_value_property(write, type.properties[i], input, pointerMap);
  }
}
