import { U64_TYPE } from '../../../../types/number/u64/u64-type.constant';
import { IU64Type } from '../../../../types/number/u64/u64-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u64_type(
  read: ReadFunction,
): IU64Type {
  return U64_TYPE;
}
