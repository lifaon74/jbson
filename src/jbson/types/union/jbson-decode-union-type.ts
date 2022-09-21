import { createRawUnionType } from '../../../types/union/create-raw-union-type';
import { IUnionType, IUnionTypeTypes } from '../../../types/union/union-type.type';
import { IUnknownType } from '../../../types/unknown/unknown-type.type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_size } from '../../shared/size/jbson-decode-size';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_union_type(
  read: ReadFunction,
): IUnionType {
  const length: number = jbson_decode_size(read);
  const types: IUnknownType[] = new Array<IUnknownType>(length);
  for (let i = 0; i < length; i++) {
    types[i] = jbson_decode_unknown_type(read);
  }
  return createRawUnionType(types as unknown as IUnionTypeTypes);
}
