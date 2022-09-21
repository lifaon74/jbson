import { F64_TYPE } from '../../../../types/number/f64/f64-type.constant';
import { IF64ArrayType } from '../../../../types/typed-array/f64/f64-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_f64_value } from '../../number/f64/jbson-encode-f64-value';

export function jbson_encode_f64_array_value(
  write: WriteFunction,
  type: IF64ArrayType,
  input: Float64Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_f64_value(write, F64_TYPE, input[i]);
  }
}
