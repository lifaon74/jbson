import { IBigintType } from '../../../types/bigint/bigint-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { BIGINT_TYPE_BYTE } from '../types.constant';

export function jbson_encode_bigint_type(
  write: WriteFunction,
  type: IBigintType,
): void {
  write(BIGINT_TYPE_BYTE);
}
