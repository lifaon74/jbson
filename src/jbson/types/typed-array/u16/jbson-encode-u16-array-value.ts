import { U16_TYPE } from '../../../../types/number/u16/u16-type.constant';
import { IU16ArrayType } from '../../../../types/typed-array/u16/u16-array-type.type';
import { jbson_encode_size } from '../../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../../shared/write-function/write-function.type';
import { jbson_encode_u16_value } from '../../number/u16/jbson-encode-u16-value';

export function jbson_encode_u16_array_value(
  write: WriteFunction,
  type: IU16ArrayType,
  input: Uint16Array,
): void {
  const length: number = input.length;
  jbson_encode_size(write, length);
  for (let i = 0; i < length; i++) {
    jbson_encode_u16_value(write, U16_TYPE, input[i]);
  }
}
