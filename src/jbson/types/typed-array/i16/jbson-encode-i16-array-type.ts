import { II16ArrayType } from '../../../../types/typed-array/i16/i16-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I16_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i16_array_type(
  write: WriteFunction,
  type: II16ArrayType,
): void {
  write(I16_ARRAY_TYPE_BYTE);
}
