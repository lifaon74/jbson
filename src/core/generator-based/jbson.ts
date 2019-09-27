import {
  ArrayBufferViewToNumberType, GetNumberInDataView, InferNumberTypeOfNumber, NumberTypeByteLength,
  NumberTypeToArrayBufferViewConstructor, SetNumberInDataView, TNumberType
} from '../number';
import {
  ANY_ARRAY, ANY_ARRAY_BUFFER, ANY_ARRAY_BUFFER_VIEW, ANY_BIGINT, ANY_BOOLEAN, ANY_BOOLEAN_OBJECT, ANY_DATE, ANY_MAP,
  ANY_NULL, ANY_NUMBER, ANY_NUMBER_OBJECT, ANY_OBJECT, ANY_POINTER, ANY_REGEXP, ANY_SET, ANY_SHARED_ARRAY_BUFFER,
  ANY_STRING, ANY_STRING_OBJECT, ANY_UNDEFINED, GetPointerFunction, IsPlainObject, Pointer, tempUint8Array, textDecoder,
  textEncoder
} from '../helpers';


// http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data

/**
 * SIZE
 */
export function * EncodeSize(size: number): Generator<number, void, void> {
  let byte: number;
  do {
    byte = (size & 0b01111111);
    size >>= 7;
    byte |= ((size !== 0) as any) << 7;
    yield byte;
  } while (size !== 0);
}


export function * DecodeSize(): Generator<void, number, number> {
  let size: number = 0;
  let byte: number;
  let offset: number = 0;
  do {
    byte = yield;
    size |= (byte & 0b01111111) << offset;
    offset += 7;
  } while (byte & 0b10000000);
  return size;
}

export function * EncodeBigSize(size: bigint): Generator<number, void, void> {
  let byte: number;
  do {
    byte = Number(size & 0b01111111n);
    size >>= 7n;
    byte |= ((size !== 0n) as any) << 7;
    yield byte;
  } while (size !== 0n);
}

export function * DecodeBigSize(): Generator<void, bigint, number> {
  let size: bigint = 0n;
  let byte: number;
  let offset: bigint = 0n;
  do {
    byte = yield;
    size |= BigInt(byte & 0b01111111) << offset;
    offset += 7n;
  } while (byte & 0b10000000);
  return size;
}


/**
 * BOOLEAN
 */
export function * EncodeBoolean(boolean: boolean): Generator<number, void, void> {
  yield boolean ? 1 : 0;
}


export function * DecodeBoolean(): Generator<void, boolean, number> {
  return ((yield) !== 0);
}


/**
 * NUMBER
 */
const dataView = new DataView(new ArrayBuffer(8));


/**
 * Converts number to a byte sequence
 * @param {number} number
 * @param {number} type
 * @param {number} littleEndian
 */
export function * EncodeTypedNumber(number: number, type: TNumberType, littleEndian?: boolean): Generator<number, void, void> {
  SetNumberInDataView(number, type, dataView, 0, littleEndian);
  for (let i = 0, l = NumberTypeByteLength(type); i < l; i++) {
    yield dataView.getUint8(i);
  }
}

/**
 * Converts a byte sequence to a number according to a type
 * @param type
 * @param littleEndian
 */
export function * DecodeTypedNumber(type: TNumberType, littleEndian?: boolean): Generator<void, number, number> {
  for (let i = 0, l = NumberTypeByteLength(type); i < l; i++) {
    dataView.setUint8(i, yield);
  }
  return GetNumberInDataView( type, dataView, 0, littleEndian);
}


export function * EncodeNumberWithType(number: number, type: TNumberType = InferNumberTypeOfNumber(number), littleEndian?: boolean): Generator<number, void, void> {
  yield type;
  yield * EncodeTypedNumber(number, type, littleEndian);
}

export function * DecodeNumberWithType(littleEndian?: boolean): Generator<void, number, number> {
  const type: TNumberType = (yield) as TNumberType;
  return yield * DecodeTypedNumber(type, littleEndian);
}

export function EncodeNumber(number: number): Generator<number, void, void> {
  return EncodeNumberWithType(number);
}

export function DecodeNumber(): Generator<void, number, number> {
  return DecodeNumberWithType();
}


/**
 * STRING
 */
export function * EncodeString(string: string): Generator<number, void, undefined> {
  const bytes: Uint8Array = textEncoder.encode(string);
  yield * EncodeSize(bytes.length);
  yield * bytes;
}

export function * DecodeString(): Generator<void, string, number> {
  const bytes: Uint8Array = new Uint8Array(yield * DecodeSize());
  for (let i = 0, l = bytes.length; i < l; i++) {
    bytes[i] = yield;
  }
  return textDecoder.decode(bytes);
}


/**
 * BIGINT
 */
// export function BigIntToArray(input: bigint, base: bigint = 10n): number[] {
//   const array: number[] = [];
//   do {
//     array.push(Number(input % base));
//     input /= base;
//   } while (input !== 0n);
//   return array;
// }

export function EncodeBigInt(number: bigint): Generator<number, void, void> {
  return EncodeBigSize(number);
}

export function DecodeBigInt(): Generator<void, bigint, number> {
  return DecodeBigSize();
}


/**
 * DATE
 */
export function * EncodeDate(date: Date): Generator<number, void, void> {
  yield * EncodeNumber(date.valueOf());
}

export function * DecodeDate(): Generator<void, Date, number> {
  return new Date(yield * DecodeNumber());
}


/**
 * REGEXP
 */
export function * EncodeRegExp(regexp: RegExp): Generator<number, void, undefined> {
  yield * EncodeString(regexp.source);
  yield * EncodeString(regexp.flags);
}

export function * DecodeRegExp(): Generator<void, RegExp, number> {
  return new RegExp(yield * DecodeString(), yield * DecodeString());
}


/**
 * ARRAY BUFFER
 */
export function * EncodeArrayBuffer(buffer: ArrayBuffer | SharedArrayBuffer, byteOffset: number = 0, byteLength: number = buffer.byteLength): Generator<number, void, undefined> {
  yield * EncodeSize(byteLength);
  yield * new Uint8Array(buffer, byteOffset, byteLength);
}

export function * DecodeArrayBuffer(): Generator<void, ArrayBuffer, number> {
  const bytes: Uint8Array = new Uint8Array(yield * DecodeSize());
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = yield;
  }
  return bytes.buffer;
}


/**
 * ARRAY BUFFER VIEW
 */
export function * EncodeArrayBufferView(buffer: ArrayBufferView): Generator<number, void, undefined> {
  yield ArrayBufferViewToNumberType(buffer);
  yield * EncodeArrayBuffer(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

export function * DecodeArrayBufferView(): Generator<void, ArrayBufferView, number> {
  return new (NumberTypeToArrayBufferViewConstructor((yield) as TNumberType))(yield * DecodeArrayBuffer());
}


/**
 * MAP
 */
export function * EncodeMap(
  map: Map<any, any>,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): Generator<number, void, undefined> {
  yield * EncodeSize(map.size);

  for (const entry of map.entries()) {
    yield * EncodeAny(entry[0], getPointer, memory);
    yield * EncodeAny(entry[1], getPointer, memory);
  }
}

export function * DecodeMap(
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): Generator<void, Map<any, any>, number> {
  const size: number = yield * DecodeSize();
  const map: Map<any, any> = new Map<any, any>();
  memory.set(pointer, map);
  for (let i = 0; i < size; i++) {
    const key: any = yield * DecodeAny(getPointer, memory);
    const value: any = yield * DecodeAny(getPointer, memory);
    map.set(key, value);
  }
  return map;
}


/**
 * SET
 */
export function * EncodeSet(
  set: Set<any>,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): Generator<number, void, undefined> {
  yield * EncodeSize(set.size);

  for (const value of set.values()) {
    yield * EncodeAny(value, getPointer, memory);
  }
}

export function * DecodeSet(
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): Generator<void, Set<any>, number> {
  const size: number = yield * DecodeSize();
  const set: Set<any> = new Set<any>();
  memory.set(pointer, set);
  for (let i = 0; i < size; i++) {
    set.add(yield * DecodeAny(getPointer, memory));
  }
  return set;
}


/**
 * ARRAY
 */
export function * EncodeArray(
  array: any[],
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): Generator<number, void, undefined> {
  yield * EncodeSize(array.length);

  for (let i = 0; i < array.length; i++) {
    yield * EncodeAny(array[i], getPointer, memory);
  }
}

export function * DecodeArray(
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): Generator<void, any[], number> {
  const size: number = yield * DecodeSize();
  const array: any[] = new Array<any>(size);
  memory.set(pointer, array);
  for (let i = 0; i < size; i++) {
    array[i] = yield * DecodeAny(getPointer, memory);
  }
  return array;
}


/**
 * OBJECT
 */
export function * EncodeObject(
  object: any,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): Generator<number, void, undefined> {
  const entries: [any, any][] = Object.entries(object);
  yield * EncodeSize(entries.length);

  for (const entry of entries) {
    yield * EncodeAny(entry[0], getPointer, memory);
    yield * EncodeAny(entry[1], getPointer, memory);
  }
}

export function * DecodeObject(
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): Generator<void, object, number> {
  const size: number = yield * DecodeSize();
  const object: any = {};
  memory.set(pointer, object);
  for (let i = 0; i < size; i++) {
    const key: any = yield * DecodeAny(getPointer, memory);
    object[key] = yield * DecodeAny(getPointer, memory);
  }
  return object;
}


/**
 * POINTER
 */
export function EncodePointer(pointer: Pointer): Generator<number, void, void> {
  return EncodeSize(pointer);
}

export function DecodePointer(): Generator<void, Pointer, number> {
  return DecodeSize();
}


/**
 * ANY
 */
export function * EncodeAny(
  value: any,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): Generator<number, void, undefined> {
  if (memory.has(value)) {
    yield ANY_POINTER;
    yield * EncodePointer(memory.get(value) as Pointer);
  } else {
    const type: string = typeof value;

    // p4
    if (type === 'undefined') {
      yield ANY_UNDEFINED;

    } else if (value === null) {
      yield ANY_NULL;

    } else if (type === 'boolean') {
      yield ANY_BOOLEAN;
      yield * EncodeBoolean(value);

    } else if (type === 'number') {
      yield ANY_NUMBER;
      yield * EncodeNumber(value);

    } else if (type === 'string') {
      yield ANY_STRING;
      yield * EncodeString(value);

    } else if (type === 'symbol') {  // p5
      throw new Error(`Value could not be cloned: ${ value.toString() } is a Symbol`);

    } else if (type === 'bigint') {
      yield ANY_BIGINT;
      yield * EncodeBigInt(value);

    } else if (type === 'object') {
      memory.set(value, getPointer()); // p6 & p23

      if (value instanceof Boolean) { // p7
        yield ANY_BOOLEAN_OBJECT;
        yield * EncodeBoolean(value.valueOf());

      } else if (value instanceof Number) { // p8
        yield ANY_NUMBER_OBJECT;
        yield * EncodeNumber(value.valueOf());

      } else if (value instanceof String) { // p9
        yield ANY_STRING_OBJECT;
        yield * EncodeString(value.valueOf());

      } else if (value instanceof Date) { // p10
        yield ANY_DATE;
        yield * EncodeDate(value);

      } else if (value instanceof RegExp) { // p11
        yield ANY_REGEXP;
        yield * EncodeRegExp(value);

      } else if ((typeof SharedArrayBuffer !== 'undefined') && (value instanceof SharedArrayBuffer)) { // p12.2
        // if(forStorage) throw new DataCloneError('Value could not be cloned: is a SharedArrayBuffer');
        yield ANY_SHARED_ARRAY_BUFFER;
        yield * EncodeArrayBuffer(value);

      } else if (value instanceof ArrayBuffer) { // p12.3
        yield ANY_ARRAY_BUFFER;
        yield * EncodeArrayBuffer(value);

      } else if (ArrayBuffer.isView(value)) { // p13
        yield ANY_ARRAY_BUFFER_VIEW;
        yield * EncodeArrayBufferView(value);

      } else if (value instanceof Map) { // p14
        yield ANY_MAP;
        yield * EncodeMap(value, getPointer, memory);

      } else if (value instanceof Set) { // p15
        yield ANY_SET;
        yield * EncodeSet(value, getPointer, memory);

      } else if (Array.isArray(value)) { // p16
        yield ANY_ARRAY;
        yield * EncodeArray(value, getPointer, memory);

      } else if (!IsPlainObject(value)) { // p18
        // INFO super hard to implement
        let string: string = String(value);
        if (string.length > 200) {
          string = string.substring(0, 150) + '\n[...]\n' + string.slice(-50);
        }
        throw new TypeError(`Unsupported type : ${ string }`);

      } else {
        yield ANY_OBJECT;
        yield * EncodeObject(value, getPointer, memory);
      }
    } else {
      throw new TypeError(`Unsupported type : ${ type }`);
    }
  }
}

export function * DecodeAny(
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>()
): Generator<void, any, number> {

  const pointer: Pointer = getPointer();
  const type: number = yield;
  let value: any;
  switch (type) {

    case ANY_UNDEFINED:
      return void 0;
    case ANY_NULL:
      return null;
    case ANY_BOOLEAN:
      return yield * DecodeBoolean();
    case ANY_NUMBER:
      return yield * DecodeNumber();
    case ANY_STRING:
      return yield * DecodeString();
    case ANY_BIGINT:
      return yield * DecodeBigInt();

    case ANY_BOOLEAN_OBJECT:
      value = Boolean(yield * DecodeBoolean());
      break;
    case ANY_NUMBER_OBJECT:
      value = Number(yield * DecodeNumber());
      break;
    case ANY_STRING_OBJECT:
      value = String(yield * DecodeString());
      break;
    case ANY_DATE:
      value = yield * DecodeDate();
      break;
    case ANY_REGEXP:
      value = yield * DecodeRegExp();
      break;
    case ANY_SHARED_ARRAY_BUFFER:
      value = yield * DecodeArrayBuffer();
      break;
    case ANY_ARRAY_BUFFER:
      value = yield * DecodeArrayBuffer();
      break;
    case ANY_ARRAY_BUFFER_VIEW:
      value = yield * DecodeArrayBufferView();
      break;
    case ANY_MAP:
      value = yield * DecodeMap(getPointer, memory, pointer);
      break;
    case ANY_SET:
      value = yield * DecodeSet(getPointer, memory, pointer);
      break;
    case ANY_ARRAY:
      value = yield * DecodeArray(getPointer, memory, pointer);
      break;
    case ANY_OBJECT:
      value = yield * DecodeObject(getPointer, memory, pointer);
      break;
    case ANY_POINTER:
      const address: Pointer = yield * DecodePointer();
      if (memory.has(address)) {
        return memory.get(address);
      } else {
        throw new TypeError(`Find a pointer without valid pointed value`);
      }
    default:
      throw new TypeError(`Invalid type found : ${ type }`);
  }

  memory.set(pointer, value);

  return value;
}


/**
 * CLONE
 */
export function StructuredClone<T>(value: T): T {
  let index: number = 0;
  const getPointer: GetPointerFunction = () => index;

  const encoder: Generator<number, void, void> = EncodeAny(value, getPointer);
  const decoder: Generator<void, any, number> = DecodeAny(getPointer);
  decoder.next();

  let result: IteratorResult<any>;
  while (true) {
    result = encoder.next();
    if (result.done) {
      break;
    }
    index++;
    result = decoder.next(result.value);
    if (result.done) {
      break;
    }
  }

  return result.value;
}


/**
 * CODEC
 */

export function * EncodeToJBSON(value: any): Generator<number, void, void> {
  let index: number = 0;
  const getPointer: GetPointerFunction = () => index;

  const encoder: Generator<number, void, void> = EncodeAny(value, getPointer);
  let result: IteratorResult<any>;
  while (!(result = encoder.next()).done) {
    yield result.value;
    index++;
  }
}

export function * DecodeFromJBSON(): Generator<any, void, number> {
  let index: number = 0;
  const getPointer: GetPointerFunction = () => index;

  const decoder: Generator<void, any, number> = DecodeAny(getPointer);
  decoder.next();

  let result: IteratorResult<any>;
  do {
    index++;
  } while (!(result = decoder.next(yield)).done);

  return result.value;
}
