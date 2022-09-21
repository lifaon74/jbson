import { U32_TYPE } from '../../../../types/number/u32/u32-type.constant';
import { IU32ArrayType } from '../../../../types/typed-array/u32/u32-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_u32_value } from '../../number/u32/jbson-encode-u32-value';

export function jbson_encode_u32_array_value(
  write: WriteFunction,
  type: IU32ArrayType,
  input: Uint32Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_u32_value(write, U32_TYPE, input[i]);
  }
}
