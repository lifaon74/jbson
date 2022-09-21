import { IF32Type } from './f32/f32-type.type';
import { IF64Type } from './f64/f64-type.type';
import { II16Type } from './i16/i16-type.type';
import { II32Type } from './i32/i32-type.type';
import { II64Type } from './i64/i64-type.type';
import { II8Type } from './i8/i8-type.type';
import { IU16Type } from './u16/u16-type.type';
import { IU32Type } from './u32/u32-type.type';
import { IU64Type } from './u64/u64-type.type';
import { IU8Type } from './u8/u8-type.type';

export type INumberType =
  | IU8Type
  | IU16Type
  | IU32Type
  | IU64Type
  | II8Type
  | II16Type
  | II32Type
  | II64Type
  | IF32Type
  | IF64Type
  ;
