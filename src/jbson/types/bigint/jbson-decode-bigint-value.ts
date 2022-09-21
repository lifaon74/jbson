import { IBigintType } from '../../../types/bigint/bigint-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_bigint_size } from '../../shared/size/jbson-decode-bigint-size';

export function jbson_decode_bigint_value(
  read: ReadFunction,
  type: IBigintType,
): bigint {
  return jbson_decode_bigint_size(read);
}
