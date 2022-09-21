import { IObjectType } from '../../../types/object/object-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_object_value_property } from './jbson-decode-object-value-property';

export function jbson_decode_object_value(
  read: ReadFunction,
  type: IObjectType,
  pointerMap: PointerMap,
): object {
  const output: object = {};
  pointerMap.add(output);
  const length: number = type.properties.length;
  for (let i = 0; i < length; i++) {
    jbson_decode_object_value_property(read, type.properties[i], output, pointerMap);
  }
  return output;
}
