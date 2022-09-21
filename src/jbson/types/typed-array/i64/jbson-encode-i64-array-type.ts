import { II64ArrayType } from '../../../../types/typed-array/i64/i64-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I64_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i64_array_type(
  write: WriteFunction,
  type: II64ArrayType,
): void {
  write(I64_ARRAY_TYPE_BYTE);
}
