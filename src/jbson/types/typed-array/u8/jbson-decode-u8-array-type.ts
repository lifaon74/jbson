import { U8_ARRAY_TYPE } from '../../../../types/typed-array/u8/u8-array-type.constant';
import { IU8ArrayType } from '../../../../types/typed-array/u8/u8-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u8_array_type(
  read: ReadFunction,
): IU8ArrayType {
  return U8_ARRAY_TYPE;
}
