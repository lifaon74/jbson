import { IArrayType } from '../../../types/array/array-type.type';
import { createArrayType } from '../../../types/array/create-array-type';
import { ReadFunction } from '../../shared/read-function/read-function.type';
import { jbson_decode_unknown_type } from '../unknown/jbson-decode-unknown-type';

export function jbson_decode_array_type(
  read: ReadFunction,
): IArrayType {
  return createArrayType(
    jbson_decode_unknown_type(read)
  );
}
