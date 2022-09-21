import { IU8ArrayType } from '../../../../types/typed-array/u8/u8-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U8_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u8_array_type(
  write: WriteFunction,
  type: IU8ArrayType,
): void {
  write(U8_ARRAY_TYPE_BYTE);
}
