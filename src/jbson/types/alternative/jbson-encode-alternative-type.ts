import { IAlternativeType } from '../../../types/alternative/alternative-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_type } from '../unknown/jbson-encode-unknown-type';

export function jbson_encode_alternative_type(
  write: WriteFunction,
  type: IAlternativeType,
): void {
  jbson_encode_unknown_type(write, type.types[0]);
}
