import { IArrayType } from '../../../types/array/array-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_value } from '../unknown/jbson-encode-unknown-value';

export function jbson_encode_array_value(
  write: WriteFunction,
  type: IArrayType,
  input: readonly unknown[],
  pointerMap: PointerMap,
): void {
  pointerMap.add(input);
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_unknown_value(write, type.itemsType, input[i], pointerMap);
  }
}
