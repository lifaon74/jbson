import { IBigintType } from '../../../types/bigint/bigint-type.type';
import { jbson_encode_bigint_size } from '../../shared/size/jbson-encode-bigint-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';

export function jbson_encode_bigint_value(
  write: WriteFunction,
  type: IBigintType,
  input: bigint,
): void {
  jbson_encode_bigint_size(write, input);
}
