import { IU8Type } from '../../../../types/number/u8/u8-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U8_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u8_type(
  write: WriteFunction,
  type: IU8Type,
): void {
  write(U8_TYPE_BYTE);
}
