import { IPointerType } from '../../../types/pointer/pointer-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';

export function jbson_encode_pointer_value(
  write: WriteFunction,
  type: IPointerType,
  input: unknown,
  pointerMap: PointerMap,
): void {
  jbson_encode_size(write, pointerMap.getId(input));
}
