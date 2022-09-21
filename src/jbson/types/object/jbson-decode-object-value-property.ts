import { IObjectTypeProperty } from '../../../types/object/object-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_unknown_value } from '../unknown/jbson-decode-unknown-value';

export function jbson_decode_object_value_property(
  read: ReadFunction,
  property: IObjectTypeProperty,
  output: object,
  pointerMap: PointerMap,
): void {
  output[property[0]] = jbson_decode_unknown_value(read, property[1], pointerMap);
}
