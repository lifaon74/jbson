import { U64_ARRAY_TYPE } from '../../../../types/typed-array/u64/u64-array-type.constant';
import { IU64ArrayType } from '../../../../types/typed-array/u64/u64-array-type.type';
import { ReadFunction } from '../../../shared/read-function/read-function.type';

export function jbson_decode_u64_array_type(
  read: ReadFunction,
): IU64ArrayType {
  return U64_ARRAY_TYPE;
}
