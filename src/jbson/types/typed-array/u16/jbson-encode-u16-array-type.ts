import { IU16ArrayType } from '../../../../types/typed-array/u16/u16-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U16_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u16_array_type(
  write: WriteFunction,
  type: IU16ArrayType,
): void {
  write(U16_ARRAY_TYPE_BYTE);
}
