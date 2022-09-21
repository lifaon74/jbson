import { II8ArrayType } from '../../../../types/typed-array/i8/i8-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I8_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i8_array_type(
  write: WriteFunction,
  type: II8ArrayType,
): void {
  write(I8_ARRAY_TYPE_BYTE);
}
