[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/jbson.svg)](https://www.npmjs.com/package/@lifaon/jbson)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@lifaon/jbson.svg)
![npm](https://img.shields.io/npm/dm/@lifaon/jbson.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/jbson.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/jbson.svg)



# JBSON #

Javascript Binary Structured Object Notation

This library provides tools to :
- encode javascript values like `objects`, `Map`, `numbers`, `ArrayBuffer`, etc... into a sequence of bytes
- decode JBSON bytes' sequence into js values
- clone complex variables (structured clone)

It may be used to transmit complex data structure than JSON doesn't support like:
- binary data (ArrayBuffer)
- built-in types: Map, Set, RegExp, Date, BigInt, etc...
- circular references and pointers

Or you may use it to clone a complex variable.

To install:
```bash
yarn add @lifaon/jbson
# or 
npm i @lifaon/jbson --save
```

Entry point: `index.js`. I recommend you to use rollup to import/bundle the package,
but you may use an already bundled version in `bundles/`.

You may also use unpkg: `https://unpkg.com/@lifaon/jbson`


**WARN:** This implementation is different than mongoDB's BSON.

**INFO:** This implementation doesn't aim to compress data:
- in some cases the size may be strongly reduced (10~30% of the size of the JSON equivalent)
- in other cases data may be bigger than JSON (a few)
- moreover, strings are not compressed, so you'll still benefit of gziping the bytes when sending them.

**INFO:** suggested mime-type: `application/jbson`

Related:
- https://msgpack.org/
- https://en.wikipedia.org/wiki/BSON
- https://en.wikipedia.org/wiki/UBJSON

## Usage ##

### Encoding ###
```ts
// WARN the returned Uint8Array is shared, use .slice() to clone its values
function EncodeToJBSON<T>(value: T): Uint8Array;
```

**Example:**

```ts
const obj: any = {};
obj.obj = obj;
console.log(EncodeToJBSON(obj)); // output Uint8Array([17, 1, 4, 3, 111, 98, 106, 127, 0])
```

### Decoding ###
```ts
function DecodeFromJBSON<T>(buffer: Uint8Array): T;
```

**Example:**

```ts
console.log(DecodeFromJBSON(new Uint8Array([17, 1, 4, 3, 111, 98, 106, 127, 0]))); // output { obj: { obj: { ... } } }
```

### Cloning ###
```ts
function StructuredClone<T>(value: T): T;
```

**Example:**

```ts
console.log(StructuredClone({ a: 1 })); // output { a: 1 }
```


## JBSON Spec ##

Assuming than:
- `write` is a function which writes a byte into a buffer and increment the write index.
- `read` is a function which reads a byte from a buffer and increment the read index.

```ts
export type WriteFunction  = (value: number) => void;
export type ReadFunction  = () => number;
```

Pointers:
```ts
export type Pointer = number;
export type GetPointerFunction = () => Pointer;
```
Some structures may include some circular or shared references like: `const obj = {}; obj.obj = obj;`

JBSON supports such conditions by creating a `Pointer` which is nothing more than the index where is reference as been encoded.

Notations:
- `0b[bit 7, bit 6, ... bit 0]` => represents a byte
- `[0b[...], 0b[...]]` or `[1, 2, 3, ...]` => represents a sequence of bytes

### Size ###
The size is a variable length number, encoded in 7 bits every bytes, where the 8th bit is used to notify than the next byte is part of this number.

`[0b[<bit 7>: 1 if more bits are required to encode the number, <bit 6-0>: number bits (little endian)], ...repeat{0,}]`

**Example:** encoding `1234` (0b 0000 0100 1101 0010)

`[0b11010010, 0b00000100]`

<details>
<summary>show</summary>
<p>

```ts
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

export function EncodeBigSize(size: bigint, write: WriteFunction): void {
  let byte: number;
  do {
    byte = Number(size & 0b01111111n);
    size >>= 7n;
    byte |= ((size !== 0n) as any) << 7;
    write(byte);
  } while (size !== 0n);
}

export function DecodeBigSize(read: ReadFunction): bigint {
  let size: bigint = 0n;
  let byte: number;
  let offset: bigint = 0n;
  do {
    byte = read();
    size |= BigInt(byte & 0b01111111) << offset;
    offset += 7n;
  } while (byte & 0b10000000);
  return size;
}
```

</p>
</details>

### Types ###

The following encoders/decoders wont specify the **type byte** preceding the encoded bits. The type byte values are specified into the [any](#any) section.


#### Boolean ####

The booleans are simply stored as 0 if false and 1 if true.

`[0b[<bit 7-1>: 0, boolean ? 1 : 0]]`

**Example:**

- true: `[0b00000001]` = `[1]`
- false: `[0b00000000]` = `[0]`

<details>
<summary>show</summary>
<p>

```ts
export function EncodeBoolean(boolean: boolean, write: WriteFunction): void {
  write(boolean ? 1 : 0);
}

export function DecodeBoolean(read: ReadFunction): boolean {
  return (read() !== 0);
}
```

</p>
</details>


#### Number ####

Numbers may have the following types:
```ts
export enum NUMBER_TYPES {
  INT8 = 0x00,
  UINT8 = 0x01,
  INT16 = 0x02,
  UINT16 = 0x03,
  INT32 = 0x04,
  UINT32 = 0x05,
  INT64 = 0x06,
  UINT64 = 0x07,
  FLOAT32 = 0x08,
  FLOAT64 = 0x09,
}
```
They are stored like that:

`[0b[<bit 7-0>: NUMBER_TYPES[type of the number]], ...number bits stored as big-endian{1-8}]`

**Example:** encoding `1234`
1) Inferred type: `NUMBER_TYPES.UINT16`
2) Bytes: `[3 /* number type (uint16) */, 4 /* high byte of the number */, 210 /* low byte of the number */]` = `[3, 4, 210]`


<details>
<summary>show</summary>
<p>

```ts
const dataView = new DataView(new ArrayBuffer(8));

export function EncodeNumber(number: number, write: WriteFunction): void {
  const type: NUMBER_TYPES = InferNumberTypeOfNumber(number);
  write(type);
  SetNumberInDataView(number, type, dataView, 0, false);
  for (let i = 0, l = NumberTypeByteLength(type); i < l; i++) {
    write(dataView.getUint8(i));
  }
}

export function DecodeNumber(read: ReadFunction): number {
  const type: NUMBER_TYPES = read();
  for (let i = 0, l = NumberTypeByteLength(type); i < l; i++) {
    dataView.setUint8(i, read());
  }
  return GetNumberInDataView(type, dataView, 0, false);
}
```

</p>
</details>


#### String ####

Strings are converted into an utf8 encoded Uint8Array, then the array [length](#size) is encoded using `EncodeSize` and finally the content is written just after.

`[...size of the string{1,}, ...content of the string{0,}]`

**Example:** encoding `'abc'`

`[3 /* string's length */, 97 /* 'a' */, 98 /* 'b' */, 99 /* 'c' */]` =  `[3, 97, 98, 99]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeString(string: string, write: WriteFunction): void {
  const bytes: Uint8Array = textEncoder.encode(string);
  EncodeSize(bytes.length, write);
  for (let i = 0, l = bytes.length; i < l; i++) {
    write(bytes[i]);
  }
}

export function DecodeString(read: ReadFunction): string {
  const size: number = DecodeSize(read);
  const bytes: Uint8Array = (size < tempUint8Array.length) ? tempUint8Array : new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = read();
  }
  return textDecoder.decode(bytes.subarray(0, size));
}
```

</p>
</details>


#### BigInt ####

BigInts are simply stored as if they where [size](#size)

**Example:** encoding `1234n`

`[210, 9]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeBigInt(number: bigint, write: WriteFunction): void {
  return EncodeBigSize(number, write);
}

export function DecodeBigInt(read: ReadFunction): bigint {
  return DecodeBigSize(read);
}
```

</p>
</details>


#### Date ####

Dates are stored as [number](#number) (timestamp in milliseconds) using `EncodeNumber`.

`[...timestamp of the date in milliseconds encoded as number{2,9}]`

**Example:** encoding `new Date('04 Dec 1995 00:12:00 GMT')`

`[7 /* number type (uint64) */, 0, 0, 0, 190, 118, 189, 140, 128 /* ... number bits */]` =  `[7, 0, 0, 0, 190, 118, 189, 140, 128]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeDate(date: Date, write: WriteFunction): void {
  EncodeNumber(date.valueOf(), write);
}

export function DecodeDate(read: ReadFunction): Date {
  return new Date(DecodeNumber(read));
}
```

</p>
</details>


#### RegExp ####

RegExps are stored as a tuple of [string](#string) composed of the source and the flags using `EncodeString`.

`[...regexp.source encoded as string{1,}, ...regexp.flags encoded as string{1,}]`

**Example:** encoding `new RegExp(/abc/g)`

`[3 /* regex.source's length */, 97, 98, 99 /* ... 'abc' */, 1 /* regex.flags' length */, 103 /* 'g' */]` = `[3, 97, 98, 99, 1, 103]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeRegExp(regexp: RegExp, write: WriteFunction): void {
  EncodeString(regexp.source, write);
  EncodeString(regexp.flags, write);
}

export function DecodeRegExp(read: ReadFunction): RegExp {
  return new RegExp(DecodeString(read), DecodeString(read));
}
```

</p>
</details>


#### ArrayBuffer ####

ArrayBuffers are stored as a tuple composed of its [size](#size) and its content bytes.

`[...size of the buffer{1,}, ...buffer bytes{0,}]`

**Example:** encoding `new Uint8Array([0, 1, 2]).buffer`

`[3 /* buffer's size */, 0, 1, 2 /* ... buffer's content */]` = `[3, 0, 1, 2]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeArrayBuffer(buffer: ArrayBuffer | SharedArrayBuffer, write: WriteFunction, byteOffset: number = 0, byteLength: number = buffer.byteLength): void {
  EncodeSize(byteLength, write);
  const bytes: Uint8Array = new Uint8Array(buffer, byteOffset, byteLength);
  for (let i = 0, l = bytes.length; i < l; i++) {
    write(bytes[i]);
  }
}

export function DecodeArrayBuffer(read: ReadFunction): ArrayBuffer {
  const bytes: Uint8Array = new Uint8Array(DecodeSize(read));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = read();
  }
  return bytes.buffer;
}
```

</p>
</details>


#### ArrayBufferView ####

ArrayBufferView (Uint8Array, Uint16Array, ...) are stored as a tuple composed of its [number type](#number) (uint8, uint16, etc... see `NUMBER_TYPES`) and its content encoded as an [ArrayBuffer](#array-buffer) with `EncodeArrayBuffer`.

`[buffer type {1}, ...buffer size and bytes{1,}]`

**Example:** encoding `new Uint8Array([0, 1, 2])`

`[1 /* buffer's type (uint8) */, 3 /* buffer's size */, 0, 1, 2 /* ... buffer's content */]` =  `[1, 3, 0, 1, 2]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeArrayBufferView(buffer: ArrayBufferView, write: WriteFunction): void {
  write(ArrayBufferViewToNumberType(buffer));
  EncodeArrayBuffer(buffer.buffer, write, buffer.byteOffset, buffer.byteLength);
}

export function DecodeArrayBufferView(read: ReadFunction): ArrayBufferView {
  return new (NumberTypeToArrayBufferViewConstructor(read()))(DecodeArrayBuffer(read));
}
```

</p>
</details>


#### Map ####

Maps are stored as:

`[map entries' size {1,}, ...for each entries: tuple<EncodeAny(key), EncodeAny(value)>]`

**Example:** encoding `new Map([['a', 1]])`

```ts
[
    1 /* number of entries in the map */,

    /** entry 0: **/

        4 /* string type */,
        1 /* string's length */,
        97 /* 'a' */,

        3 /* number type */,
        1 /* (uint8) */,
        1 /* value */
]
```
= `[1, 4, 1, 97, 3, 1, 1]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeMap(
  map: Map<any, any>,
  write: WriteFunction,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): void {
  EncodeSize(map.size, write);

  for (const entry of map.entries()) {
    EncodeAny(entry[0], write, getPointer, memory);
    EncodeAny(entry[1], write, getPointer, memory);
  }
}

export function DecodeMap(
  read: ReadFunction,
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): Map<any, any> {
  const size: number = DecodeSize(read);
  const map: Map<any, any> = new Map<any, any>();
  memory.set(pointer, map);
  for (let i = 0; i < size; i++) {
    const key: any = DecodeAny(read, getPointer, memory);
    const value: any = DecodeAny(read, getPointer, memory);
    map.set(key, value);
  }
  return map;
}
```

</p>
</details>


#### Set ####

Sets are stored as:

`[set values' size {1,}, ...for each values: EncodeAny(value)]`

**Example:** encoding `new Set(['a', 1])`

```ts
[
    2 /* number of values in the set */,

    /** entry 0: **/
        4 /* string type */,
        1 /* string's length */,
        97 /* 'a' */,

    /** entry 1: **/
        3 /* number type */,
        1 /* (uint8) */,
        1 /* value */
]
```
= `[2, 4, 1, 97, 3, 1, 1]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeSet(
  set: Set<any>,
  write: WriteFunction,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): void {
  EncodeSize(set.size, write);

  for (const value of set.values()) {
    EncodeAny(value, write, getPointer, memory);
  }
}

export function DecodeSet(
  read: ReadFunction,
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): Set<any> {
  const size: number = DecodeSize(read);
  const set: Set<any> = new Set<any>();
  memory.set(pointer, set);
  for (let i = 0; i < size; i++) {
    set.add(DecodeAny(read, getPointer, memory));
  }
  return set;
}
```

</p>
</details>


#### Array ####

Arrays are stored exactly as [Set](#set)

**Example:** encoding `['a', 1]`

```ts
[
    2 /* number of values in the array */,

    /** entry 0: **/
        4 /* string type */,
        1 /* string's length */,
        97 /* 'a' */,

    /** entry 1: **/
        3 /* number type */,
        1 /* (uint8) */,
        1 /* value */
]
```
= `[2, 4, 1, 97, 3, 1, 1]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeArray(
  array: any[],
  write: WriteFunction,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): void {
  EncodeSize(array.length, write);

  for (let i = 0, l = array.length; i < l; i++) {
    EncodeAny(array[i], write, getPointer, memory);
  }
}

export function DecodeArray(
  read: ReadFunction,
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): any[] {
  const size: number = DecodeSize(read);
  const array: any[] = new Array<any>(size);
  memory.set(pointer, array);
  for (let i = 0; i < size; i++) {
    array[i] = DecodeAny(read, getPointer, memory);
  }
  return array;
}
```

</p>
</details>


#### Object ####

Objects are stored exactly as [Map](#map)

**Example:** encoding `{ a: 1 }`

```ts
[
    1 /* number of properties in the object */,

    /** property 0: **/

        /** property's key: **/
            4 /* string type */,
            1 /* string's length */,
            97 /* 'a' */,

        /** property's value: **/
            3 /* number type */,
            1 /* (uint8) */,
            1 /* value */
]
```
= `[1, 4, 1, 97, 3, 1, 1]`


<details>
<summary>show</summary>
<p>

```ts
export function EncodeObject(
  object: any,
  write: WriteFunction,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): void {
  const entries: [any, any][] = Object.entries(object);
  EncodeSize(entries.length, write);

  for (let i = 0, l = entries.length; i < l; i++) {
    EncodeAny(entries[i][0], write, getPointer, memory);
    EncodeAny(entries[i][1], write, getPointer, memory);
  }
}

export function DecodeObject(
  read: ReadFunction,
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  pointer: Pointer = getPointer()
): object {
  const size: number = DecodeSize(read);
  const object: any = {};
  memory.set(pointer, object);
  for (let i = 0; i < size; i++) {
    const key: any = DecodeAny(read, getPointer, memory);
    object[key] = DecodeAny(read, getPointer, memory);
  }
  return object;
}
```

</p>
</details>

#### Pointer ####

```ts
export type Pointer = number;
export type GetPointerFunction = () => Pointer;
```
Some structures may include circular or shared references like: `const obj = {}; obj.obj = obj;`

JBSON supports such conditions by creating a `Pointer` which is nothing more than the index where is reference as been encoded.

Pointers are stored as [size](#size)


**Example:** full encoding of `const obj = {}; obj.obj = obj;`

```ts
[
    17 /* object type */,
    1 /* number of properties in the object */,

    /** property 0: **/

        /** property's key: **/
            4 /* string type */,
            3/* property key's length */,
            111, 98, 106, /* 'obj' */

        /** property's value: **/
            127 /* pointer type */,
            0 /* index where is stored the reference's value => 0 which is the index of the object */
]
```
= `[17, 1, 4, 3, 111, 98, 106, 127, 0]`

<details>
<summary>show</summary>
<p>

```ts
export function EncodePointer(pointer: Pointer, write: WriteFunction): void {
  return EncodeSize(pointer, write);
}

export function DecodePointer(read: ReadFunction): Pointer {
  return DecodeSize(read);
}
```

</p>
</details>


#### Any ####

*Any* is the entry point for every value you want to encode / decode.
The encoder will convert a value into a sequence of bytes composed of the type of the value and its encoded bytes.

```ts
export enum ANY_TYPES {
  UNDEFINED = 0x00,
  NULL = 0x01,
  BOOLEAN = 0x02,
  NUMBER = 0x03,
  STRING = 0x04,
  SYMBOL = 0x05,
  BOOLEAN_OBJECT = 0x06,
  NUMBER_OBJECT = 0x07,
  STRING_OBJECT = 0x08,
  DATE = 0x09,
  REGEXP = 0x0a,
  SHARED_ARRAY_BUFFER = 0x0b,
  ARRAY_BUFFER = 0x0c,
  ARRAY_BUFFER_VIEW = 0x0d,
  MAP = 0x0e,
  SET = 0x0f,
  ARRAY = 0x10,
  OBJECT = 0x11,
  BIGINT = 0x12,

  POINTER = 0x7f,
}
```

`[value's type {1}, ...encoded value's bytes{1,}]`

<details>
<summary>show encoding</summary>
<p>

```ts
export function EncodeAny(
  value: any,
  write: WriteFunction,
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>()
): void {
  if (memory.has(value)) {
    write(ANY_TYPES.POINTER);
    EncodePointer(memory.get(value) as Pointer, write);
  } else {
    if ((value !== null) && (value !== void 0) && (typeof value.toJBSON === 'function')) {
      EncodeAny(value.toJBSON(), write, getPointer, memory);
    } else {
      const type: string = typeof value;

      // p4
      if (type === 'undefined') {
        write(ANY_TYPES.UNDEFINED);

      } else if (value === null) {
        write(ANY_TYPES.NULL);

      } else if (type === 'boolean') {
        write(ANY_TYPES.BOOLEAN);
        EncodeBoolean(value, write);

      } else if (type === 'number') {
        write(ANY_TYPES.NUMBER);
        EncodeNumber(value, write);

      } else if (type === 'string') {
        write(ANY_TYPES.STRING);
        EncodeString(value, write);

      } else if (type === 'symbol') {  // p5
        throw new Error(`Value could not be cloned: ${ value.toString() } is a Symbol`);

      } else if (type === 'bigint') {
        write(ANY_TYPES.BIGINT);
        EncodeBigInt(value, write);

      } else if (type === 'object') {
        memory.set(value, getPointer()); // p6 & p23

        if (value instanceof Boolean) { // p7
          write(ANY_TYPES.BOOLEAN_OBJECT);
          EncodeBoolean(value.valueOf(), write);

        } else if (value instanceof Number) { // p8
          write(ANY_TYPES.NUMBER_OBJECT);
          EncodeNumber(value.valueOf(), write);

        } else if (value instanceof String) { // p9
          write(ANY_TYPES.STRING_OBJECT);
          EncodeString(value.valueOf(), write);

        } else if (value instanceof Date) { // p10
          write(ANY_TYPES.DATE);
          EncodeDate(value, write);

        } else if (value instanceof RegExp) { // p11
          write(ANY_TYPES.REGEXP);
          EncodeRegExp(value, write);

        } else if ((typeof SharedArrayBuffer !== 'undefined') && (value instanceof SharedArrayBuffer)) { // p12.2
          // if(forStorage) throw new DataCloneError('Value could not be cloned: is a SharedArrayBuffer');
          write(ANY_TYPES.SHARED_ARRAY_BUFFER);
          EncodeArrayBuffer(value, write);

        } else if (value instanceof ArrayBuffer) { // p12.3
          write(ANY_TYPES.ARRAY_BUFFER);
          EncodeArrayBuffer(value, write);

        } else if (ArrayBuffer.isView(value)) { // p13
          write(ANY_TYPES.ARRAY_BUFFER_VIEW);
          EncodeArrayBufferView(value, write);

        } else if (value instanceof Map) { // p14
          write(ANY_TYPES.MAP);
          EncodeMap(value, write, getPointer, memory);

        } else if (value instanceof Set) { // p15
          write(ANY_TYPES.SET);
          EncodeSet(value, write, getPointer, memory);

        } else if (Array.isArray(value)) { // p16
          write(ANY_TYPES.ARRAY);
          EncodeArray(value, write, getPointer, memory);

        } else if (!IsPlainObject(value)) { // p18
          if (typeof value.toJSON === 'function') {
            EncodeAny(value.toJSON(), write, getPointer, memory);
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
          write(ANY_TYPES.OBJECT);
          EncodeObject(value, write, getPointer, memory);
        }
      } else {
        throw new TypeError(`Unsupported type : ${ type }`);
      }
    }
  }
}
```

</p>
</details>

<details>
<summary>show decoding</summary>
<p>

```ts
export function DecodeAny(
  read: ReadFunction,
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>()
): any {

  const pointer: Pointer = getPointer();
  const type: number = read();
  let value: any;
  switch (type) {

    case ANY_TYPES.UNDEFINED:
      return void 0;
    case ANY_TYPES.NULL:
      return null;
    case ANY_TYPES.BOOLEAN:
      return DecodeBoolean(read);
    case ANY_TYPES.NUMBER:
      return DecodeNumber(read);
    case ANY_TYPES.STRING:
      return DecodeString(read);
    case ANY_TYPES.BIGINT:
      return DecodeBigInt(read);

    case ANY_TYPES.BOOLEAN_OBJECT:
      value = Boolean(DecodeBoolean(read));
      break;
    case ANY_TYPES.NUMBER_OBJECT:
      value = Number(DecodeNumber(read));
      break;
    case ANY_TYPES.STRING_OBJECT:
      value = String(DecodeString(read));
      break;
    case ANY_TYPES.DATE:
      value = DecodeDate(read);
      break;
    case ANY_TYPES.REGEXP:
      value = DecodeRegExp(read);
      break;
    case ANY_TYPES.SHARED_ARRAY_BUFFER:
      value = DecodeArrayBuffer(read);
      break;
    case ANY_TYPES.ARRAY_BUFFER:
      value = DecodeArrayBuffer(read);
      break;
    case ANY_TYPES.ARRAY_BUFFER_VIEW:
      value = DecodeArrayBufferView(read);
      break;
    case ANY_TYPES.MAP:
      value = DecodeMap(read, getPointer, memory, pointer);
      break;
    case ANY_TYPES.SET:
      value = DecodeSet(read, getPointer, memory, pointer);
      break;
    case ANY_TYPES.ARRAY:
      value = DecodeArray(read, getPointer, memory, pointer);
      break;
    case ANY_TYPES.OBJECT:
      value = DecodeObject(read, getPointer, memory, pointer);
      break;
    case ANY_TYPES.POINTER:
      const address: Pointer = DecodePointer(read);
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
```

</p>
</details>

