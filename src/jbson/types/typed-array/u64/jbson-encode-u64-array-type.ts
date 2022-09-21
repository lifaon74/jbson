import { IU64ArrayType } from '../../../../types/typed-array/u64/u64-array-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U64_ARRAY_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u64_array_type(
  write: WriteFunction,
  type: IU64ArrayType,
): void {
  write(U64_ARRAY_TYPE_BYTE);
}
