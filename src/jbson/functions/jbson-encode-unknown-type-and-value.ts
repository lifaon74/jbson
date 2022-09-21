import { IUnknownType } from '../../types/unknown/unknown-type.type';
import { PointerMap } from '../classes/pointer-map.class';
import { WriteFunction } from '../shared/write-function/write-function.type';
import { jbson_encode_unknown_type } from '../types/unknown/jbson-encode-unknown-type';
import { jbson_encode_unknown_value } from '../types/unknown/jbson-encode-unknown-value';

export function jbson_encode_unknown_type_and_value(
  write: WriteFunction,
  type: IUnknownType,
  input: unknown,
): void {
  jbson_encode_unknown_type(write, type);
  jbson_encode_unknown_value(write, type, input, new PointerMap());
}
