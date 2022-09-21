import { BIGINT_TYPE } from '../../../types/bigint/bigint-type.constant';
import { IBigintType } from '../../../types/bigint/bigint-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';

export function jbson_decode_bigint_type(
  read: ReadFunction,
): IBigintType {
  return BIGINT_TYPE;
}
