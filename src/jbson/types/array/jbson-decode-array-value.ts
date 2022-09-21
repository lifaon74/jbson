import { IArrayType } from '../../../types/array/array-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { jbson_decode_unknown_value } from '../unknown/jbson-decode-unknown-value';

export function jbson_decode_array_value(
  read: ReadFunction,
  type: IArrayType,
  pointerMap: PointerMap,
): unknown[] {
  const length: number = jbson_decode_size(read);
  const output: unknown[] = new Array<unknown>(length);
  pointerMap.add(output);
  for (let i = 0; i < length; i++) {
    output[i] = jbson_decode_unknown_value(read, type.itemsType, pointerMap);
  }
  return output;
}
