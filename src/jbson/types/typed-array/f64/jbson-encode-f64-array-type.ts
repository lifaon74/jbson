import { IF64ArrayType } from '../../../../types/typed-array/f64/f64-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { F64_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_f64_array_type(
  write: WriteFunction,
  type: IF64ArrayType,
): void {
  write(F64_ARRAY_TYPE_BYTE);
}
