import { II16Type } from '../../../../types/number/i16/i16-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I16_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i16_type(
  write: WriteFunction,
  type: II16Type,
): void {
  write(I16_TYPE_BYTE);
}
