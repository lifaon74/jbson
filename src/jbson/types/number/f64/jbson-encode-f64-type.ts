import { IF64Type } from '../../../../types/number/f64/f64-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { F64_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_f64_type(
  write: WriteFunction,
  type: IF64Type,
): void {
  write(F64_TYPE_BYTE);
}
