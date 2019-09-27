// import { IterableIterator, IteratorResult } from '../../iterable/Iterable';
//
//
// // http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data
//
//
//
// /**
//  * SIZE
//  */
// export function EncodeSize(size: number, buffer: Uint8Array, index: number = 0): number {
//   let byte: number;
//   do {
//     byte = (size & 0b01111111);
//     size >>= 7;
//     byte |= ((size !== 0) as any) << 7;
//     buffer[index++] = byte;
//   } while (size !== 0);
//   return index;
// }
//
// export function DecodeSize(buffer: Uint8Array, index: number = 0): [number, number] {
//   let size: number = 0;
//   let byte: number;
//   let offset: number = 0;
//   do {
//     byte = buffer[index];
//     size |= (byte & 0b01111111) << offset;
//     offset += 7;
//   } while (byte & 0b10000000);
//   return [index, size];
// }
//
//
// export function EncodeBigSize(size: bigint, buffer: Uint8Array, index: number = 0): number {
//   let byte: number;
//   do {
//     byte = Number(size & 0b01111111n);
//     size >>= 7n;
//     byte |= ((size !== 0n) as any) << 7;
//     buffer[index] = byte;
//   } while (size !== 0n);
//   return index;
// }
//
// export function DecodeBigSize(buffer: Uint8Array, index: number = 0): [number, bigint] {
//   let size: bigint = 0n;
//   let byte: number;
//   let offset: bigint = 0n;
//   do {
//     byte = buffer[index++];
//     size |= BigInt(byte & 0b01111111) << offset;
//     offset += 7n;
//   } while (byte & 0b10000000);
//   return [index, size];
// }
//
//
// /**
//  * BOOLEAN
//  */
// export function * EncodeBoolean(boolean: boolean): IterableIterator<void, number> {
//   yield boolean ? 1 : 0;
// }
//
// export function * EncodeBooleanBuffer(boolean: boolean, buffer: WriteBuffer): IterableIterator<void, number> {
//   yield boolean ? 1 : 0;
// }
//
// export function * DecodeBoolean(): IterableIterator<number, boolean | void> {
//   return ((yield) !== 0);
// }
//
//
// /**
//  * NUMBER
//  */
// export function EncodeNumber(number: number): IterableIterator<void, number> {
//   return EncodeNumberWithType(number);
// }
//
// export function DecodeNumber(): IterableIterator<number, number | void> {
//   return DecodeNumberWithType();
// }
//
//
// /**
//  * STRING
//  */
// export function * EncodeString(string: string): IterableIterator<void, number> {
//   const bytes: Uint8Array = new TextEncoder().encode(string);
//   yield * EncodeSize(bytes.length);
//   yield * bytes;
// }
//
// export function * DecodeString(): IterableIterator<number, string | number | void> {
//   const bytes: Uint8Array = new Uint8Array(yield * DecodeSize());
//   for (let i = 0, l = bytes.length; i < l; i++) {
//     bytes[i] = yield;
//   }
//   return new TextDecoder().decode(bytes);
// }
//
//
// /**
//  * BIGINT
//  */
// // export function BigIntToArray(input: bigint, base: bigint = 10n): number[] {
// //   const array: number[] = [];
// //   do {
// //     array.push(Number(input % base));
// //     input /= base;
// //   } while (input !== 0n);
// //   return array;
// // }
//
// export function EncodeBigInt(number: bigint): IterableIterator<void, number> {
//   return EncodeBigSize(number);
// }
//
// export function DecodeBigInt(): IterableIterator<number, bigint | void> {
//   return DecodeBigSize();
// }
//
//
// /**
//  * DATE
//  */
// export function * EncodeDate(date: Date): IterableIterator<void, number> {
//   yield * EncodeNumber(date.valueOf());
// }
//
// export function * DecodeDate(): IterableIterator<number, any> {
//   return new Date(yield * DecodeNumber());
// }
//
//
// /**
//  * REGEXP
//  */
// export function * EncodeRegExp(regexp: RegExp): IterableIterator<void, number> {
//   yield * EncodeString(regexp.source);
//   yield * EncodeString(regexp.flags);
// }
//
// export function * DecodeRegExp(): IterableIterator<number, any> {
//   return new RegExp(yield * DecodeString(), yield * DecodeString());
// }
//
//
// /**
//  * ARRAY BUFFER
//  */
// export function * EncodeArrayBuffer(buffer: ArrayBuffer | SharedArrayBuffer): IterableIterator<void, number> {
//   yield * EncodeSize(buffer.byteLength);
//   yield * new Uint8Array(buffer);
// }
//
// export function * DecodeArrayBuffer(): IterableIterator<number, ArrayBuffer | number | void> {
//   const bytes: Uint8Array = new Uint8Array(yield * DecodeSize());
//   for (let i = 0; i < bytes.length; i++) {
//     bytes[i] = yield;
//   }
//   return bytes.buffer;
// }
//
//
// /**
//  * ARRAY BUFFER VIEW
//  */
// export function * EncodeArrayBufferView(buffer: ArrayBufferView): IterableIterator<void, number> {
//   yield ArrayBufferViewToNumberType(buffer);
//   yield * EncodeArrayBuffer(buffer.buffer);
// }
//
// export function * DecodeArrayBufferView(): IterableIterator<number, any> {
//   return new (NumberTypeToArrayBufferViewConstructor(yield))(yield * DecodeArrayBuffer());
// }
//
//
// /**
//  * MAP
//  */
// export function * EncodeMap(
//   map: Map<any, any>,
//   getPointer: GetPointerFunction,
//   memory: Map<any, Pointer> = new Map<any, Pointer>()
// ): IterableIterator<void, number> {
//   yield * EncodeSize(map.size);
//
//   for (const entry of map.entries()) {
//     yield * EncodeAny(entry[0], getPointer, memory);
//     yield * EncodeAny(entry[1], getPointer, memory);
//   }
// }
//
// export function * DecodeMap(
//   getPointer: GetPointerFunction,
//   memory: Map<Pointer, any> = new Map<Pointer, any>(),
//   pointer: Pointer = getPointer()
// ): IterableIterator<number, Map<any, any> | number | void> {
//   const size: number = yield * DecodeSize();
//   const map: Map<any, any> = new Map<any, any>();
//   memory.set(pointer, map);
//   for (let i = 0; i < size; i++) {
//     const key: any = yield * DecodeAny(getPointer, memory);
//     const value: any = yield * DecodeAny(getPointer, memory);
//     map.set(key, value);
//   }
//   return map;
// }
//
//
// /**
//  * SET
//  */
// export function * EncodeSet(
//   set: Set<any>,
//   getPointer: GetPointerFunction,
//   memory: Map<any, Pointer> = new Map<any, Pointer>()
// ): IterableIterator<void, number> {
//   yield * EncodeSize(set.size);
//
//   for (const value of set.values()) {
//     yield * EncodeAny(value, getPointer, memory);
//   }
// }
//
// export function * DecodeSet(
//   getPointer: GetPointerFunction,
//   memory: Map<Pointer, any> = new Map<Pointer, any>(),
//   pointer: Pointer = getPointer()
// ): IterableIterator<number, Set<any> | number | void> {
//   const size: number = yield * DecodeSize();
//   const set: Set<any> = new Set<any>();
//   memory.set(pointer, set);
//   for (let i = 0; i < size; i++) {
//     set.add(yield * DecodeAny(getPointer, memory));
//   }
//   return set;
// }
//
//
// /**
//  * ARRAY
//  */
// export function * EncodeArray(
//   array: any[],
//   getPointer: GetPointerFunction,
//   memory: Map<any, Pointer> = new Map<any, Pointer>()
// ): IterableIterator<void, number> {
//   yield * EncodeSize(array.length);
//
//   for (let i = 0; i < array.length; i++) {
//     yield * EncodeAny(array[i], getPointer, memory);
//   }
// }
//
// export function * DecodeArray(
//   getPointer: GetPointerFunction,
//   memory: Map<Pointer, any> = new Map<Pointer, any>(),
//   pointer: Pointer = getPointer()
// ): IterableIterator<number, any[] | number | void> {
//   const size: number = yield * DecodeSize();
//   const array: any[] = new Array<any>(size);
//   memory.set(pointer, array);
//   for (let i = 0; i < size; i++) {
//     array[i] = yield * DecodeAny(getPointer, memory);
//   }
//   return array;
// }
//
//
// /**
//  * OBJECT
//  */
// export function * EncodeObject(
//   object: any,
//   getPointer: GetPointerFunction,
//   memory: Map<any, Pointer> = new Map<any, Pointer>()
// ): IterableIterator<void, number> {
//   const entries: [any, any][] = Object.entries(object);
//   yield * EncodeSize(entries.length);
//
//   for (const entry of entries) {
//     yield * EncodeAny(entry[0], getPointer, memory);
//     yield * EncodeAny(entry[1], getPointer, memory);
//   }
// }
//
// export function * DecodeObject(
//   getPointer: GetPointerFunction,
//   memory: Map<Pointer, any> = new Map<Pointer, any>(),
//   pointer: Pointer = getPointer()
// ): IterableIterator<number, object | number | void> {
//   const size: number = yield * DecodeSize();
//   const object: any = {};
//   memory.set(pointer, object);
//   for (let i = 0; i < size; i++) {
//     const key: any = yield * DecodeAny(getPointer, memory);
//     object[key] = yield * DecodeAny(getPointer, memory);
//   }
//   return object;
// }
//
//
// /**
//  * POINTER
//  */
// export function EncodePointer(pointer: Pointer): IterableIterator<void, number> {
//   return EncodeSize(pointer);
// }
//
// export function DecodePointer(): IterableIterator<number, Pointer | void> {
//   return DecodeSize();
// }
//
//
// /**
//  * ANY
//  */
// export function * EncodeAny(
//   value: any,
//   getPointer: GetPointerFunction,
//   memory: Map<any, Pointer> = new Map<any, Pointer>()
// ): IterableIterator<void, number> {
//   if (memory.has(value)) {
//     yield ANY_TYPES.POINTER;
//     yield * EncodePointer(memory.get(value));
//   } else {
//     const type: string = typeof value;
//
//     // p4
//     if (type === 'undefined') {
//       yield ANY_TYPES.UNDEFINED;
//
//     } else if (value === null) {
//       yield ANY_TYPES.NULL;
//
//     } else if (type === 'boolean') {
//       yield ANY_TYPES.BOOLEAN;
//       yield * EncodeBoolean(value);
//
//     } else if (type === 'number') {
//       yield ANY_TYPES.NUMBER;
//       yield * EncodeNumber(value);
//
//     } else if (type === 'string') {
//       yield ANY_TYPES.STRING;
//       yield * EncodeString(value);
//
//     } else if (type === 'symbol') {  // p5
//       throw new Error(`Value could not be cloned: ${ value.toString() } is a Symbol`);
//
//     } else if (type === 'bigint') {
//       yield ANY_TYPES.BIGINT;
//       yield * EncodeBigInt(value);
//
//     } else if (type === 'object') {
//       memory.set(value, getPointer()); // p6 & p23
//
//       if (value instanceof Boolean) { // p7
//         yield ANY_TYPES.BOOLEAN_OBJECT;
//         yield * EncodeBoolean(value.valueOf());
//
//       } else if (value instanceof Number) { // p8
//         yield ANY_TYPES.NUMBER_OBJECT;
//         yield * EncodeNumber(value.valueOf());
//
//       } else if (value instanceof String) { // p9
//         yield ANY_TYPES.STRING_OBJECT;
//         yield * EncodeString(value.valueOf());
//
//       } else if (value instanceof Date) { // p10
//         yield ANY_TYPES.DATE;
//         yield * EncodeDate(value);
//
//       } else if (value instanceof RegExp) { // p11
//         yield ANY_TYPES.REGEXP;
//         yield * EncodeRegExp(value);
//
//       } else if ((typeof SharedArrayBuffer !== 'undefined') && (value instanceof SharedArrayBuffer)) { // p12.2
//         // if(forStorage) throw new DataCloneError('Value could not be cloned: is a SharedArrayBuffer');
//         yield ANY_TYPES.SHARED_ARRAY_BUFFER;
//         yield * EncodeArrayBuffer(value);
//
//       } else if (value instanceof ArrayBuffer) { // p12.3
//         yield ANY_TYPES.ARRAY_BUFFER;
//         yield * EncodeArrayBuffer(value);
//
//       } else if (ArrayBuffer.isView(value)) { // p13
//         yield ANY_TYPES.ARRAY_BUFFER_VIEW;
//         yield * EncodeArrayBufferView(value);
//
//       } else if (value instanceof Map) { // p14
//         yield ANY_TYPES.MAP;
//         yield * EncodeMap(value, getPointer, memory);
//
//       } else if (value instanceof Set) { // p15
//         yield ANY_TYPES.SET;
//         yield * EncodeSet(value, getPointer, memory);
//
//       } else if (Array.isArray(value)) { // p16
//         yield ANY_TYPES.ARRAY;
//         yield * EncodeArray(value, getPointer, memory);
//
//       } else if (!IsPlainObject(value)) { // p18
//         // INFO super hard to implement
//         let string: string = String(value);
//         if (string.length > 200) {
//           string = string.substring(0, 150) + '\n[...]\n' + string.slice(-50);
//         }
//         throw new TypeError(`Unsupported type : ${ string }`);
//
//       } else {
//         yield ANY_TYPES.OBJECT;
//         yield * EncodeObject(value, getPointer, memory);
//       }
//     } else {
//       throw new TypeError(`Unsupported type : ${ type }`);
//     }
//   }
// }
//
// export function * DecodeAny(
//   getPointer: GetPointerFunction,
//   memory: Map<Pointer, any> = new Map<Pointer, any>()
// ): IterableIterator<number, any> {
//
//   const pointer: Pointer = getPointer();
//   const type: number = yield;
//   let value: any;
//   switch (type) {
//
//     case ANY_TYPES.UNDEFINED:
//       return void 0;
//     case ANY_TYPES.NULL:
//       return null;
//     case ANY_TYPES.BOOLEAN:
//       return yield * DecodeBoolean();
//     case ANY_TYPES.NUMBER:
//       return yield * DecodeNumber();
//     case ANY_TYPES.STRING:
//       return yield * DecodeString();
//     case ANY_TYPES.BIGINT:
//       return yield * DecodeBigInt();
//
//     case ANY_TYPES.BOOLEAN_OBJECT:
//       value = Boolean(yield * DecodeBoolean());
//       break;
//     case ANY_TYPES.NUMBER_OBJECT:
//       value = Number(yield * DecodeNumber());
//       break;
//     case ANY_TYPES.STRING_OBJECT:
//       value = String(yield * DecodeString());
//       break;
//     case ANY_TYPES.DATE:
//       value = yield * DecodeDate();
//       break;
//     case ANY_TYPES.REGEXP:
//       value = yield * DecodeRegExp();
//       break;
//     case ANY_TYPES.SHARED_ARRAY_BUFFER:
//       value = yield * DecodeArrayBuffer();
//       break;
//     case ANY_TYPES.ARRAY_BUFFER:
//       value = yield * DecodeArrayBuffer();
//       break;
//     case ANY_TYPES.ARRAY_BUFFER_VIEW:
//       value = yield * DecodeArrayBufferView();
//       break;
//     case ANY_TYPES.MAP:
//       value = yield * DecodeMap(getPointer, memory, pointer);
//       break;
//     case ANY_TYPES.SET:
//       value = yield * DecodeSet(getPointer, memory, pointer);
//       break;
//     case ANY_TYPES.ARRAY:
//       value = yield * DecodeArray(getPointer, memory, pointer);
//       break;
//     case ANY_TYPES.OBJECT:
//       value = yield * DecodeObject(getPointer, memory, pointer);
//       break;
//     case ANY_TYPES.POINTER:
//       const address: Pointer = yield * DecodePointer();
//       if (memory.has(address)) {
//         return memory.get(address);
//       } else {
//         throw new TypeError(`Find a pointer without valid pointed value`);
//       }
//     default:
//       throw new TypeError(`Invalid type found : ${ type }`);
//   }
//
//   memory.set(pointer, value);
//
//   return value;
// }
//
//
// /**
//  * CLONE
//  */
// export function Clone<T>(value: T): T {
//   let index: number = 0;
//   const getPointer: GetPointerFunction = () => index;
//
//   const encoder: IterableIterator<void, number> = EncodeAny(value, getPointer);
//   const decoder: IterableIterator<number, any> = DecodeAny(getPointer);
//   decoder.next();
//
//   let result: IteratorResult<any>;
//   while (true) {
//     result = encoder.next();
//     if (result.done) {
//       break;
//     }
//     index++;
//     result = decoder.next(result.value);
//     if (result.done) {
//       break;
//     }
//   }
//
//   return result.value;
// }
//
//
// /**
//  * CODEC
//  */
//
// export function * EncodeToJBSON(value: any): IterableIterator<void, number> {
//   let index: number = 0;
//   const getPointer: GetPointerFunction = () => index;
//
//   const encoder: IterableIterator<void, number> = EncodeAny(value, getPointer);
//   let result: IteratorResult<any>;
//   while (!(result = encoder.next()).done) {
//     yield result.value;
//     index++;
//   }
// }
//
// export function * DecodeFromJBSON(): IterableIterator<number, any> {
//   let index: number = 0;
//   const getPointer: GetPointerFunction = () => index;
//
//   const decoder: IterableIterator<number, any> = DecodeAny(getPointer);
//   decoder.next();
//
//   let result: IteratorResult<any>;
//   do {
//     index++;
//   } while (!(result = decoder.next(yield)).done);
//
//   return result.value;
// }
