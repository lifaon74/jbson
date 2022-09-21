import { IMapType } from '../../../types/map/map-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { jbson_decode_unknown_value } from '../unknown/jbson-decode-unknown-value';

export function jbson_decode_map_value(
  read: ReadFunction,
  type: IMapType,
  pointerMap: PointerMap,
): Map<unknown, unknown> {
  const output: Map<unknown, unknown> = new Map<unknown, unknown>();
  pointerMap.add(output);
  const size: number = jbson_decode_size(read);
  for (let i = 0; i < size; i++) {
    output.set(
      jbson_decode_unknown_value(read, type.keyType, pointerMap),
      jbson_decode_unknown_value(read, type.valueType, pointerMap),
    );
  }
  return output;
}
