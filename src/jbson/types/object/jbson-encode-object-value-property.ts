import { IObjectTypeProperty } from '../../../types/object/object-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_value } from '../unknown/jbson-encode-unknown-value';

export function jbson_encode_object_value_property(
  write: WriteFunction,
  property: IObjectTypeProperty,
  input: object,
  pointerMap: PointerMap,
): void {
  jbson_encode_unknown_value(write, property[1], input[property[0]], pointerMap);
}
