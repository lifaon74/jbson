import { createSetType } from '../../../types/set/create-set-type';
import { ISetType } from '../../../types/set/set-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_set_type(
  read: ReadFunction,
): ISetType {
  return createSetType(jbson_decode_unknown_type(read));
}
