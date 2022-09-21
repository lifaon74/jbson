import { isPlainObject } from '../misc/is-plain-object';
import { BIGINT_TYPE } from '../types/bigint/bigint-type.constant';
import { BOOLEAN_TYPE } from '../types/boolean/boolean-type.constant';
import { NULL_TYPE } from '../types/null/null-type.constant';
import { STRING_TYPE } from '../types/string/string-type.constant';
import { F32_ARRAY_TYPE } from '../types/typed-array/f32/f32-array-type.constant';
import { F64_ARRAY_TYPE } from '../types/typed-array/f64/f64-array-type.constant';
import { I16_ARRAY_TYPE } from '../types/typed-array/i16/i16-array-type.constant';
import { I32_ARRAY_TYPE } from '../types/typed-array/i32/i32-array-type.constant';
import { I64_ARRAY_TYPE } from '../types/typed-array/i64/i64-array-type.constant';
import { I8_ARRAY_TYPE } from '../types/typed-array/i8/i8-array-type.constant';
import { U16_ARRAY_TYPE } from '../types/typed-array/u16/u16-array-type.constant';
import { U32_ARRAY_TYPE } from '../types/typed-array/u32/u32-array-type.constant';
import { U64_ARRAY_TYPE } from '../types/typed-array/u64/u64-array-type.constant';
import { U8_ARRAY_TYPE } from '../types/typed-array/u8/u8-array-type.constant';
import { UNDEFINED_TYPE } from '../types/undefined/undefined-type.constant';
import { IUnknownType } from '../types/unknown/unknown-type.type';
import { inferArrayType } from './infer-array-type';
import { IInferInputSet } from './infer-input-set.type';
import { inferMapType } from './infer-map-type';
import { inferNumberType } from './infer-number-type';
import { inferObjectType } from './infer-object-type';
import { inferPointerType } from './infer-pointer-type';
import { inferSetType } from './infer-set-type';

export function inferUnknownType(
  input: unknown,
  inputSet: IInferInputSet,
): IUnknownType {
  if (input === null) {
    return NULL_TYPE;
  } else if (input === void 0) {
    return UNDEFINED_TYPE;
  } else {
    switch (typeof input) {
      case 'boolean':
        return BOOLEAN_TYPE;
      case 'number':
        return inferNumberType(input);
      case 'bigint':
        return BIGINT_TYPE;
      case 'string':
        return STRING_TYPE;
      case 'object': {
        return inferPointerType(
          input,
          inputSet,
          (): IUnknownType => {
            if (input instanceof Uint8Array) {
              return U8_ARRAY_TYPE;
            } else if (input instanceof Uint16Array) {
              return U16_ARRAY_TYPE;
            } else if (input instanceof Uint32Array) {
              return U32_ARRAY_TYPE;
            } else if (input instanceof BigUint64Array) {
              return U64_ARRAY_TYPE;
            } else if (input instanceof Int8Array) {
              return I8_ARRAY_TYPE;
            } else if (input instanceof Int16Array) {
              return I16_ARRAY_TYPE;
            } else if (input instanceof Int32Array) {
              return I32_ARRAY_TYPE;
            } else if (input instanceof BigInt64Array) {
              return I64_ARRAY_TYPE;
            } else if (input instanceof Float32Array) {
              return F32_ARRAY_TYPE;
            } else if (input instanceof Float64Array) {
              return F64_ARRAY_TYPE;
            } else if (Array.isArray(input)) {
              return inferArrayType(input, inputSet);
            } else if (input instanceof Set) {
              return inferSetType(input, inputSet);
            } else if (input instanceof Map) {
              return inferMapType(input, inputSet);
            } else if (isPlainObject(input)) {
              return inferObjectType(input as object, inputSet);
            } else {
              throw new Error(`Unsupported type`);
            }
          });
      }
      default:
        throw new Error(`Unsupported type`);
    }
  }
}
