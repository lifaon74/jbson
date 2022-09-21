import { IUnknownType } from '../unknown/unknown-type.type';
import { isF32Type } from './f32/is-f32-type';
import { isF64Type } from './f64/is-f64-type';
import { isI16Type } from './i16/is-i16-type';
import { isI32Type } from './i32/is-i32-type';
import { isI64Type } from './i64/is-i64-type';
import { isI8Type } from './i8/is-i8-type';
import { INumberType } from './number-type.type';
import { isU16Type } from './u16/is-u16-type';
import { isU32Type } from './u32/is-u32-type';
import { isU64Type } from './u64/is-u64-type';
import { isU8Type } from './u8/is-u8-type';

export function isNumberType(
  value: IUnknownType,
): value is INumberType {
  return isU8Type(value)
    || isU16Type(value)
    || isU32Type(value)
    || isU64Type(value)
    || isI8Type(value)
    || isI16Type(value)
    || isI32Type(value)
    || isI64Type(value)
    || isF32Type(value)
    || isF64Type(value)
    ;
}
