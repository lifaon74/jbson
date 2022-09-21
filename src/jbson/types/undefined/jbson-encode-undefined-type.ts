import { IUndefinedType } from '../../../types/undefined/undefined-type.type';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { UNDEFINED_TYPE_BYTE } from '../types.constant';

export function jbson_encode_undefined_type(
  write: WriteFunction,
  type: IUndefinedType,
): void {
  write(UNDEFINED_TYPE_BYTE);
}
