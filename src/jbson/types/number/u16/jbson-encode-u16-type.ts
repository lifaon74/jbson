import { IU16Type } from '../../../../types/number/u16/u16-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U16_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u16_type(
  write: WriteFunction,
  type: IU16Type,
): void {
  write(U16_TYPE_BYTE);
}
