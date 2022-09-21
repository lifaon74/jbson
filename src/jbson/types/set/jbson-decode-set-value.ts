import { ISetType } from '../../../types/set/set-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { jbson_decode_unknown_value } from '../unknown/jbson-decode-unknown-value';

export function jbson_decode_set_value(
  read: ReadFunction,
  type: ISetType,
  pointerMap: PointerMap,
): Set<unknown> {
  const size: number = jbson_decode_size(read);
  const output: Set<unknown> = new Set<unknown>();
  pointerMap.add(output);
  for (let i = 0; i < size; i++) {
    output.add(jbson_decode_unknown_value(read, type.itemsType, pointerMap));
  }
  return output;
}
