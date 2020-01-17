import {
  ArrayBufferViewToNumberType, GetNumberInDataView, InferNumberTypeOfNumber, NumberTypeByteLength,
  NumberTypeToArrayBufferViewConstructor, SetNumberInDataView, TNumberType
} from '../number';
import {
  ANY_ARRAY, ANY_ARRAY_BUFFER, ANY_ARRAY_BUFFER_VIEW, ANY_BIGINT, ANY_BOOLEAN, ANY_BOOLEAN_OBJECT, ANY_DATE, ANY_MAP,
  ANY_NULL, ANY_NUMBER, ANY_NUMBER_OBJECT, ANY_OBJECT, ANY_POINTER, ANY_REGEXP, ANY_SET, ANY_SHARED_ARRAY_BUFFER,
  ANY_STRING, ANY_STRING_OBJECT, ANY_UNDEFINED, CreateDecodingContext, CreateEncodingContext, DecodingContext,
  EncodingContext,
  IsPlainObject,
  Pointer,
  tempUint8Array, textDecoder,
  textEncoder, TRANSFERABLE
} from '../helpers';


// http://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data

export class WriteBuffer {
  protected _buffer: Uint8Array;
  protected _index: number;

  constructor(buffer: Uint8Array = tempUint8Array) {
    this._buffer = buffer;
    this._index = 0;
  }

  get buffer(): Uint8Array {
    return this._buffer.subarray(0, this._index);
  }

  get length(): number {
    return this._index;
  }

  write(value: number): void {
    if (this._index >= this._buffer.length) {
      console.log('force expand');
      const buffer: Uint8Array = new Uint8Array(Math.round(this._buffer.length * 2));
      buffer.set(this._buffer);
      this._buffer = buffer;
    }
    this._buffer[this._index++] = value;
  }
}

export class ReadBuffer {
  protected _buffer: Uint8Array;
  protected _index: number;

  constructor(buffer: Uint8Array) {
    this._buffer = buffer;
    this._index = 0;
  }

  get buffer(): Uint8Array {
    return this._buffer;
  }

  get index(): number {
    return this._index;
  }

  read(): number {
    if (this._index < this._buffer.length) {
      return this._buffer[this._index++];
    } else {
      throw new RangeError(`Reach end of ReadBuffer`);
    }
  }
}


export type WriteFunction  = (value: number) => void;
export type ReadFunction  = () => number;



/**
 * SIZE
 */
export function EncodeSize(size: number, write: WriteFunction): void {
  let byte: number;
  do {
    byte = (size & 0b01111111);
    size >>= 7;
    byte |= ((size !== 0) as any) << 7;
    write(byte);
  } while (size !== 0);
}

export function DecodeSize(read: ReadFunction): number {
  let size: number = 0;
  let byte: number;
  let offset: number = 0;
  do {
    byte = read();
    size |= (byte & 0b01111111) << offset;
    offset += 7;
  } while (byte & 0b10000000);
  return size;
}


const BIG_INT_0 = BigInt(0);
const BIG_INT_7 = BigInt(7);
const BIG_INT_0B01111111 = BigInt(0b01111111);

export function EncodeBigSize(size: bigint, write: WriteFunction): void {
  let byte: number;
  do {
    byte = Number(size & BIG_INT_0B01111111);
    size >>= BIG_INT_7;
    byte |= ((size !== BIG_INT_0) as any) << 7;
    write(byte);
  } while (size !== BIG_INT_0);
}

export function DecodeBigSize(read: ReadFunction): bigint {
  let size: bigint = BIG_INT_0;
  let byte: number;
  let offset: bigint = BIG_INT_0;
  do {
    byte = read();
    size |= BigInt(byte & 0b01111111) << offset;
    offset += BIG_INT_7;
  } while (byte & 0b10000000);
  return size;
}

/**
 * BYTES
 */
export function EncodeBytes(bytes: Uint8Array, write: WriteFunction): void {
  EncodeSize(bytes.length, write);
  for (let i = 0, l = bytes.length; i < l; i++) {
    write(bytes[i]);
  }
}

const DECODE_BYTES_TEMP_UINT8_ARRAY = new Uint8Array(1e6);

export function DecodeBytes(read: ReadFunction, safeToUseTempBuffer: boolean = false): Uint8Array {
  const size: number = DecodeSize(read);

  const bytes: Uint8Array = ((size < DECODE_BYTES_TEMP_UINT8_ARRAY.length) && safeToUseTempBuffer)
    ? DECODE_BYTES_TEMP_UINT8_ARRAY
    : new Uint8Array(size);

  for (let i = 0; i < size; i++) {
    bytes[i] = read();
  }

  return (bytes.length > size)
    ? bytes.subarray(0, size)
    : bytes;
}


/**
 * BOOLEAN
 */
export function EncodeBoolean(boolean: boolean, write: WriteFunction): void {
  write(boolean ? 1 : 0);
}

export function DecodeBoolean(read: ReadFunction): boolean {
  return (read() !== 0);
}


/**
 * NUMBER
 */
const dataView = new DataView(new ArrayBuffer(8));

export function EncodeNumber(number: number, write: WriteFunction): void {
  const type: TNumberType = InferNumberTypeOfNumber(number);
  write(type);
  SetNumberInDataView(number, type, dataView, 0, false);
  for (let i = 0, l = NumberTypeByteLength(type); i < l; i++) {
    write(dataView.getUint8(i));
  }
}

export function DecodeNumber(read: ReadFunction): number {
  const type: TNumberType = read() as TNumberType;
  for (let i = 0, l = NumberTypeByteLength(type); i < l; i++) {
    dataView.setUint8(i, read());
  }
  return GetNumberInDataView(type, dataView, 0, false);
}


/**
 * STRING
 */

export function EncodeString(string: string, write: WriteFunction): void {
  EncodeBytes(textEncoder.encode(string), write);
}

export function DecodeString(read: ReadFunction): string {
  return textDecoder.decode(DecodeBytes(read, true));
}


/**
 * BIGINT
 */

export function EncodeBigInt(number: bigint, write: WriteFunction): void {
  return EncodeBigSize(number, write);
}

export function DecodeBigInt(read: ReadFunction): bigint {
  return DecodeBigSize(read);
}


/**
 * DATE
 */
export function EncodeDate(date: Date, write: WriteFunction): void {
  EncodeNumber(date.valueOf(), write);
}

export function DecodeDate(read: ReadFunction): Date {
  return new Date(DecodeNumber(read));
}


/**
 * REGEXP
 */
export function EncodeRegExp(regexp: RegExp, write: WriteFunction): void {
  EncodeString(regexp.source, write);
  EncodeString(regexp.flags, write);
}

export function DecodeRegExp(read: ReadFunction): RegExp {
  return new RegExp(DecodeString(read), DecodeString(read));
}


/**
 * ARRAY BUFFER
 */
export function EncodeArrayBuffer(buffer: ArrayBuffer | SharedArrayBuffer, write: WriteFunction, byteOffset: number = 0, byteLength: number = buffer.byteLength): void {
  EncodeBytes(new Uint8Array(buffer, byteOffset, byteLength), write);
}

export function DecodeArrayBuffer(read: ReadFunction): ArrayBuffer {
  return DecodeBytes(read, false).buffer;
}


/**
 * ARRAY BUFFER VIEW
 */
export function EncodeArrayBufferView(buffer: ArrayBufferView, write: WriteFunction): void {
  write(ArrayBufferViewToNumberType(buffer));
  EncodeArrayBuffer(buffer.buffer, write, buffer.byteOffset, buffer.byteLength);
}

export function DecodeArrayBufferView(read: ReadFunction): ArrayBufferView {
  return new (NumberTypeToArrayBufferViewConstructor(read() as TNumberType))(DecodeArrayBuffer(read));
}


/**
 * MAP
 */
export function EncodeMap(
  map: Map<any, any>,
  write: WriteFunction,
  context: EncodingContext,
): void {
  EncodeSize(map.size, write);

  const iterator: Iterator<[any, any]> = map.entries();
  let result: IteratorResult<[any, any]>;
  while (!(result = iterator.next()).done) {
    EncodeAny(result.value[0], write, context);
    EncodeAny(result.value[1], write, context);
  }
}

export function DecodeMap(
  read: ReadFunction,
  context: DecodingContext,
  pointer: Pointer = context.getPointer(),
): Map<any, any> {
  const size: number = DecodeSize(read);
  const map: Map<any, any> = new Map<any, any>();
  context.memory.set(pointer, map);
  for (let i = 0; i < size; i++) {
    const key: any = DecodeAny(read, context);
    const value: any = DecodeAny(read, context);
    map.set(key, value);
  }
  return map;
}


/**
 * SET
 */
export function EncodeSet(
  set: Set<any>,
  write: WriteFunction,
  context: EncodingContext,
): void {
  EncodeSize(set.size, write);

  const iterator: Iterator<any> = set.values();
  let result: IteratorResult<any>;
  while (!(result = iterator.next()).done) {
    EncodeAny(result.value, write, context);
  }
}

export function DecodeSet(
  read: ReadFunction,
  context: DecodingContext,
  pointer: Pointer = context.getPointer(),
): Set<any> {
  const size: number = DecodeSize(read);
  const set: Set<any> = new Set<any>();
  context.memory.set(pointer, set);
  for (let i = 0; i < size; i++) {
    set.add(DecodeAny(read, context));
  }
  return set;
}


/**
 * ARRAY
 */
export function EncodeArray(
  array: any[],
  write: WriteFunction,
  context: EncodingContext,
): void {
  EncodeSize(array.length, write);

  for (let i = 0, l = array.length; i < l; i++) {
    EncodeAny(array[i], write, context);
  }
}

export function DecodeArray(
  read: ReadFunction,
  context: DecodingContext,
  pointer: Pointer = context.getPointer(),
): any[] {
  const size: number = DecodeSize(read);
  const array: any[] = new Array<any>(size);
  context.memory.set(pointer, array);
  for (let i = 0; i < size; i++) {
    array[i] = DecodeAny(read, context);
  }
  return array;
}


/**
 * OBJECT
 */
export function EncodeObject(
  object: any,
  write: WriteFunction,
  context: EncodingContext,
): void {
  const entries: [any, any][] = Object.entries(object);
  EncodeSize(entries.length, write);

  for (let i = 0, l = entries.length; i < l; i++) {
    EncodeAny(entries[i][0], write, context);
    EncodeAny(entries[i][1], write, context);
  }
}

export function DecodeObject(
  read: ReadFunction,
  context: DecodingContext,
  pointer: Pointer = context.getPointer(),
): object {
  const size: number = DecodeSize(read);
  const object: any = {};
  context.memory.set(pointer, object);
  for (let i = 0; i < size; i++) {
    const key: any = DecodeAny(read, context);
    object[key] = DecodeAny(read, context);
  }
  return object;
}


/**
 * POINTER
 */
export function EncodePointer(pointer: Pointer, write: WriteFunction): void {
  return EncodeSize(pointer, write);
}

export function DecodePointer(read: ReadFunction): Pointer {
  return DecodeSize(read);
}


/**
 * TRANSFERABLE
 */
export function EncodeTransferable(transferableIndex: number, write: WriteFunction): void {
  return EncodeSize(transferableIndex, write);
}

export function DecodeTransferable(read: ReadFunction): number {
  return DecodeSize(read);
}


/**
 * ANY
 */
export function EncodeAny(
  value: any,
  write: WriteFunction,
  context: EncodingContext,
): void {
  if (context.transferable.has(value)) {
    write(TRANSFERABLE);
    EncodeTransferable(context.transferable.get(value) as number, write);
  } else if (context.memory.has(value)) {
    write(ANY_POINTER);
    EncodePointer(context.memory.get(value) as Pointer, write);
  } else {
    if ((value !== null) && (value !== void 0) && (typeof value.toJBSON === 'function')) {
      EncodeAny(value.toJBSON(), write, context);
    } else {
      const type: string = typeof value;

      // p4
      if (type === 'undefined') {
        write(ANY_UNDEFINED);

      } else if (value === null) {
        write(ANY_NULL);

      } else if (type === 'boolean') {
        write(ANY_BOOLEAN);
        EncodeBoolean(value, write);

      } else if (type === 'number') {
        write(ANY_NUMBER);
        EncodeNumber(value, write);

      } else if (type === 'string') {
        write(ANY_STRING);
        EncodeString(value, write);

      } else if (type === 'symbol') {  // p5
        throw new Error(`Value could not be cloned: ${ value.toString() } is a Symbol`);

      } else if (type === 'bigint') {
        write(ANY_BIGINT);
        EncodeBigInt(value, write);

      } else if (type === 'object') {
        context.memory.set(value, context.getPointer()); // p6 & p23

        if (value instanceof Boolean) { // p7
          write(ANY_BOOLEAN_OBJECT);
          EncodeBoolean(value.valueOf(), write);

        } else if (value instanceof Number) { // p8
          write(ANY_NUMBER_OBJECT);
          EncodeNumber(value.valueOf(), write);

        } else if (value instanceof String) { // p9
          write(ANY_STRING_OBJECT);
          EncodeString(value.valueOf(), write);

        } else if (value instanceof Date) { // p10
          write(ANY_DATE);
          EncodeDate(value, write);

        } else if (value instanceof RegExp) { // p11
          write(ANY_REGEXP);
          EncodeRegExp(value, write);

        } else if ((typeof SharedArrayBuffer !== 'undefined') && (value instanceof SharedArrayBuffer)) { // p12.2
          // if(forStorage) throw new DataCloneError('Value could not be cloned: is a SharedArrayBuffer');
          write(ANY_SHARED_ARRAY_BUFFER);
          EncodeArrayBuffer(value, write);

        } else if (value instanceof ArrayBuffer) { // p12.3
          write(ANY_ARRAY_BUFFER);
          EncodeArrayBuffer(value, write);

        } else if (ArrayBuffer.isView(value)) { // p13
          write(ANY_ARRAY_BUFFER_VIEW);
          EncodeArrayBufferView(value, write);

        } else if (value instanceof Map) { // p14
          write(ANY_MAP);
          EncodeMap(value, write, context);

        } else if (value instanceof Set) { // p15
          write(ANY_SET);
          EncodeSet(value, write, context);

        } else if (Array.isArray(value)) { // p16
          write(ANY_ARRAY);
          EncodeArray(value, write, context);

        } else if (!IsPlainObject(value)) { // p18
          if (typeof value.toJSON === 'function') {
            EncodeAny(value.toJSON(), write, context);
          } else {
            // INFO super hard to implement
            let string: string = String(value);
            if (string.length > 200) {
              string = string.substring(0, 150) + '\n[...]\n' + string.slice(-50);
            }
            console.log(value);
            throw new TypeError(`Unsupported type : ${ string }`);
          }
        } else {
          write(ANY_OBJECT);
          EncodeObject(value, write, context);
        }
      } else {
        throw new TypeError(`Unsupported type : ${ type }`);
      }
    }
  }
}

export function DecodeAny(
  read: ReadFunction,
  context: DecodingContext,
): any {

  const pointer: Pointer = context.getPointer();
  const type: number = read();
  let value: any;
  switch (type) {

    case ANY_UNDEFINED:
      return void 0;
    case ANY_NULL:
      return null;
    case ANY_BOOLEAN:
      return DecodeBoolean(read);
    case ANY_NUMBER:
      return DecodeNumber(read);
    case ANY_STRING:
      return DecodeString(read);
    case ANY_BIGINT:
      return DecodeBigInt(read);

    case ANY_BOOLEAN_OBJECT:
      value = Boolean(DecodeBoolean(read));
      break;
    case ANY_NUMBER_OBJECT:
      value = Number(DecodeNumber(read));
      break;
    case ANY_STRING_OBJECT:
      value = String(DecodeString(read));
      break;
    case ANY_DATE:
      value = DecodeDate(read);
      break;
    case ANY_REGEXP:
      value = DecodeRegExp(read);
      break;
    case ANY_SHARED_ARRAY_BUFFER:
      value = DecodeArrayBuffer(read);
      break;
    case ANY_ARRAY_BUFFER:
      value = DecodeArrayBuffer(read);
      break;
    case ANY_ARRAY_BUFFER_VIEW:
      value = DecodeArrayBufferView(read);
      break;
    case ANY_MAP:
      value = DecodeMap(read, context, pointer);
      break;
    case ANY_SET:
      value = DecodeSet(read, context, pointer);
      break;
    case ANY_ARRAY:
      value = DecodeArray(read, context, pointer);
      break;
    case ANY_OBJECT:
      value = DecodeObject(read, context, pointer);
      break;

    case ANY_POINTER:
      const address: Pointer = DecodePointer(read);
      if (context.memory.has(address)) {
        return context.memory.get(address);
      } else {
        throw new TypeError(`Find a pointer without valid pointed value`);
      }

    case TRANSFERABLE:
      const index: number = DecodeTransferable(read);
      if (context.transferable.has(index)) {
        return context.transferable.get(index);
      } else {
        throw new TypeError(`Find a transferable index out of bounds of the context.transferable list`);
      }

    default:
      throw new TypeError(`Invalid type found : ${ type }`);
  }

  context.memory.set(pointer, value);

  return value;
}


/**
 * CLONE
 */
export function StructuredClone<T>(value: T, transferable?: Transferable[]): T {
  const writeBuffer = new WriteBuffer();
  EncodeAny(value, writeBuffer.write.bind(writeBuffer), CreateEncodingContext(() => writeBuffer.length, void 0, transferable));

  const readBuffer = new ReadBuffer(writeBuffer.buffer);
  return DecodeAny(readBuffer.read.bind(readBuffer), CreateDecodingContext(() => readBuffer.index, void 0, transferable));
}


/**
 * CODEC
 */

/**
 * WARN: returned buffer is not cloned so data may vary if not sliced
 */
export function EncodeToJBSON<T>(value: T, transferable?: Transferable[]): Uint8Array {
  const writeBuffer = new WriteBuffer();
  EncodeAny(value, writeBuffer.write.bind(writeBuffer), CreateEncodingContext(() => writeBuffer.length, void 0, transferable));
  return writeBuffer.buffer;
}

export function DecodeFromJBSON<T>(buffer: Uint8Array, transferable?: Transferable[]): T {
  const readBuffer = new ReadBuffer(buffer);
  return DecodeAny(readBuffer.read.bind(readBuffer), CreateDecodingContext(() => readBuffer.index, void 0, transferable));
}
