import { ISetType } from '../../../types/set/set-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_value } from '../unknown/jbson-encode-unknown-value';

export function jbson_encode_set_value(
  write: WriteFunction,
  type: ISetType,
  input: ReadonlySet<unknown>,
  pointerMap: PointerMap,
): void {
  pointerMap.add(input);
  jbson_encode_size(write, input.size);
  const iterator: Iterator<unknown> = input.values();
  let result: IteratorResult<unknown>;
  while (!(result = iterator.next()).done) {
    jbson_encode_unknown_value(write, type.itemsType, result.value, pointerMap);
  }
}
