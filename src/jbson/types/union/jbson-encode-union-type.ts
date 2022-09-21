import { IUnionType } from '../../../types/union/union-type.type';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { UNION_TYPE_BYTE } from '../types.constant';
import { jbson_encode_unknown_type } from '../unknown/jbson-encode-unknown-type';

export function jbson_encode_union_type(
  write: WriteFunction,
  type: IUnionType,
): void {
  write(UNION_TYPE_BYTE);
  const length: number = type.types.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_unknown_type(write, type.types[i]);
  }
}
