import { I16_TYPE } from '../../../../types/number/i16/i16-type.constant';
import { II16ArrayType } from '../../../../types/typed-array/i16/i16-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_i16_value } from '../../number/i16/jbson-encode-i16-value';

export function jbson_encode_i16_array_value(
  write: WriteFunction,
  type: II16ArrayType,
  input: Int16Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_i16_value(write, I16_TYPE, input[i]);
  }
}
