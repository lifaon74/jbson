import { IU32ArrayType } from '../../../../types/typed-array/u32/u32-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U32_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u32_array_type(
  write: WriteFunction,
  type: IU32ArrayType,
): void {
  write(U32_ARRAY_TYPE_BYTE);
}
