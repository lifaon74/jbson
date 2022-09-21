import { U16_ARRAY_TYPE } from '../../../../types/typed-array/u16/u16-array-type.constant';
import { IU16ArrayType } from '../../../../types/typed-array/u16/u16-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u16_array_type(
  read: ReadFunction,
): IU16ArrayType {
  return U16_ARRAY_TYPE;
}
