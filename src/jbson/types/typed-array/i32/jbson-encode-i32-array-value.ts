import { I32_TYPE } from '../../../../types/number/i32/i32-type.constant';
import { II32ArrayType } from '../../../../types/typed-array/i32/i32-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_i32_value } from '../../number/i32/jbson-encode-i32-value';

export function jbson_encode_i32_array_value(
  write: WriteFunction,
  type: II32ArrayType,
  input: Int32Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_i32_value(write, I32_TYPE, input[i]);
  }
}
