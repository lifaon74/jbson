import { U16_TYPE } from '../../../../types/number/u16/u16-type.constant';
import { IU16Type } from '../../../../types/number/u16/u16-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u16_type(
  read: ReadFunction,
): IU16Type {
  return U16_TYPE;
}
