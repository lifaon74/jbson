import { II8Type } from '../../../../types/number/i8/i8-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { I8_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_i8_type(
  write: WriteFunction,
  type: II8Type,
): void {
  write(I8_TYPE_BYTE);
}
