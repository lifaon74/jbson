import { U32_TYPE } from '../../../../types/number/u32/u32-type.constant';
import { IU32Type } from '../../../../types/number/u32/u32-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u32_type(
  read: ReadFunction,
): IU32Type {
  return U32_TYPE;
}
