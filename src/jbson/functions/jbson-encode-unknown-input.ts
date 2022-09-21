import { inferUnknownType } from '../../infer/infer-unknown-type';
import { IUnknownType } from '../../types/unknown/unknown-type.type';
import { VerifyTypeFunction } from '../shared/verify-function/verify-function.type';
import { WriteFunction } from '../shared/write-function/write-function.type';
import { jbson_encode_unknown_type_and_value } from './jbson-encode-unknown-type-and-value';



export function jbson_encode_unknown_input(
  write: WriteFunction,
  input: unknown,
  verifyType?: VerifyTypeFunction,
): void {
  const type: IUnknownType = inferUnknownType(input, new Set());
  if (
    (verifyType !== void 0)
    && !verifyType(type)
  ) {
    throw new Error(`Invalid type`);
  }
  // console.log('type', type);
  jbson_encode_unknown_type_and_value(write, type, input);
}
