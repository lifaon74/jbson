import { IUnionType } from '../../../types/union/union-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { jbson_decode_unknown_value } from '../unknown/jbson-decode-unknown-value';

export function jbson_decode_union_value(
  read: ReadFunction,
  type: IUnionType,
  pointerMap: PointerMap,
): unknown {
  const index: number = jbson_decode_size(read);
  const output: unknown = jbson_decode_unknown_value(read, type.types[index], pointerMap);
  return output;
}
