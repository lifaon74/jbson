import { U32_ARRAY_TYPE } from '../../../../types/typed-array/u32/u32-array-type.constant';
import { IU32ArrayType } from '../../../../types/typed-array/u32/u32-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u32_array_type(
  read: ReadFunction,
): IU32ArrayType {
  return U32_ARRAY_TYPE;
}
