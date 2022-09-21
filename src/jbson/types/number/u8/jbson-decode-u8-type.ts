import { U8_TYPE } from '../../../../types/number/u8/u8-type.constant';
import { IU8Type } from '../../../../types/number/u8/u8-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u8_type(
  read: ReadFunction,
): IU8Type {
  return U8_TYPE;
}
