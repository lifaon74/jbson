import { IU32Type } from '../../../../types/number/u32/u32-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U32_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u32_type(
  write: WriteFunction,
  type: IU32Type,
): void {
  write(U32_TYPE_BYTE);
}
