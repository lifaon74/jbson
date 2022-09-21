import { IAlternativeType } from '../../../types/alternative/alternative-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_value } from '../unknown/jbson-encode-unknown-value';

export function jbson_encode_alternative_value(
  write: WriteFunction,
  type: IAlternativeType,
  input: unknown,
  pointerMap: PointerMap,
): void {
  jbson_encode_unknown_value(write, type.types[0], input, pointerMap);
}
