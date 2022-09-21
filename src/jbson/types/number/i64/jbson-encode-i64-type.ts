import { II64Type } from '../../../../types/number/i64/i64-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I64_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i64_type(
  write: WriteFunction,
  type: II64Type,
): void {
  write(I64_TYPE_BYTE);
}
