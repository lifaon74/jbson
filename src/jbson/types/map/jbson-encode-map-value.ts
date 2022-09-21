import { IMapType } from '../../../types/map/map-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_value } from '../unknown/jbson-encode-unknown-value';

export function jbson_encode_map_value(
  write: WriteFunction,
  type: IMapType,
  input: ReadonlyMap<unknown, unknown>,
  pointerMap: PointerMap,
): void {
  pointerMap.add(input);
  jbson_encode_size(write, input.size);
  const iterator: Iterator<[unknown, unknown]> = input.entries();
  let result: IteratorResult<[unknown, unknown]>;
  while (!(result = iterator.next()).done) {
    const [key, value] = result.value;
    jbson_encode_unknown_value(write, type.keyType, key, pointerMap);
    jbson_encode_unknown_value(write, type.valueType, value, pointerMap);
  }
}
