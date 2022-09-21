import { IU64Type } from '../../../../types/number/u64/u64-type.type';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { U64_TYPE_BYTE } from '../../types.constant';

export function jbson_encode_u64_type(
  write: WriteFunction,
  type: IU64Type,
): void {
  write(U64_TYPE_BYTE);
}
