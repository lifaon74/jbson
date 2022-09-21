import { VerifyTypeFunction } from '../shared/verify-function/verify-function.type';
import { createWriteFunctionFromUint8Array } from '../shared/write-function/create-write-function-from-uint8-array';
import { WriteFunction } from '../shared/write-function/write-function.type';
import { jbson_encode_unknown_input } from './jbson-encode-unknown-input';

export function jbson_encode_to_uin8_array(
  input: unknown,
  verifyType?: VerifyTypeFunction,
  array: Uint8Array = new Uint8Array(1e6),
): Uint8Array {
  return createWriteFunctionFromUint8Array(
    array,
    (
      write: WriteFunction,
    ): void => {
      jbson_encode_unknown_input(write, input, verifyType);
    },
  )[0];
}
