import { F32_TYPE } from '../../../../types/number/f32/f32-type.constant';
import { IF32ArrayType } from '../../../../types/typed-array/f32/f32-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_f32_value } from '../../number/f32/jbson-encode-f32-value';

export function jbson_encode_f32_array_value(
  write: WriteFunction,
  type: IF32ArrayType,
  input: Float32Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_f32_value(write, F32_TYPE, input[i]);
  }
}
