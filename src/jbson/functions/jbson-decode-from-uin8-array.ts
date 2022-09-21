import { createReadFunctionFromUint8Array } from '../shared/read-function/create-read-function-from-uint8-array';
import { ReadFunction } from '../shared/read-function/read-function.type';
import { VerifyTypeFunction } from '../shared/verify-function/verify-function.type';
import { jbson_decode_unknown_output } from './jbson-decode-unknown-output';

export function jbson_decode_from_uin8_array(
  array: Uint8Array,
  verifyType?: VerifyTypeFunction,
): [Uint8Array, unknown] {
  return createReadFunctionFromUint8Array(
    array,
    (
      read: ReadFunction,
    ): unknown => {
      return jbson_decode_unknown_output(read, verifyType);
    },
  );
}
