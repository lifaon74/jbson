import { IUnknownType } from '../../types/unknown/unknown-type.type';
import { PointerMap } from '../classes/pointer-map.class';
import { ReadFunction } from '../shared/read-function/read-function.type';
import { VerifyTypeFunction } from '../shared/verify-function/verify-function.type';
import { jbson_decode_unknown_type } from '../types/unknown/jbson-decode-unknown-type';
import { jbson_decode_unknown_value } from '../types/unknown/jbson-decode-unknown-value';

export function jbson_decode_unknown_output(
  read: ReadFunction,
  verifyType?: VerifyTypeFunction,
): unknown {
  const type: IUnknownType = jbson_decode_unknown_type(read);
  if (
    (verifyType !== void 0)
    && !verifyType(type)
  ) {
    throw new Error(`Invalid type`);
  }
  // console.log('type', type);
  return jbson_decode_unknown_value(read, type, new PointerMap());
}
