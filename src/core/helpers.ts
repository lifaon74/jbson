export type Pointer = number;
export type GetPointerFunction = () => Pointer;

export interface EncodingContext {
  getPointer: GetPointerFunction;
  memory: Map<any, Pointer>;
  transferable: Map<Transferable, number>;
}

export interface DecodingContext {
  getPointer: GetPointerFunction;
  memory: Map<Pointer, any>;
  transferable: Map<number, Transferable>;
}

export function CreateEncodingContext(
  getPointer: GetPointerFunction,
  memory: Map<any, Pointer> = new Map<any, Pointer>(),
  transferable?: Iterable<Transferable>,
): EncodingContext {
  return {
    getPointer,
    memory,
    // transferable: (transferable === void 0) ? [] : Array.from(transferable)
    transferable: new Map<Transferable, number>(
      (transferable === void 0)
        ? []
        : Array.from(transferable, (transferable: Transferable, index: number) => {
          return [transferable, index];
        })
    )
  };
}

export function CreateDecodingContext(
  getPointer: GetPointerFunction,
  memory: Map<Pointer, any> = new Map<Pointer, any>(),
  transferable?: Iterable<Transferable>,
): DecodingContext {
  return {
    getPointer,
    memory,
    // transferable: (transferable === void 0) ? [] : Array.from(transferable)
    transferable: new Map<number, Transferable>(
      (transferable === void 0)
        ? []
        : Array.from(transferable, (transferable: Transferable, index: number) => {
          return [index, transferable];
        })
    )
  };
}

/*---------------------*/


export const ANY_UNDEFINED = 0x00;
export const ANY_NULL = 0x01;
export const ANY_BOOLEAN = 0x02;
export const ANY_NUMBER = 0x03;
export const ANY_STRING = 0x04;
export const ANY_SYMBOL = 0x05;
export const ANY_BOOLEAN_OBJECT = 0x06;
export const ANY_NUMBER_OBJECT = 0x07;
export const ANY_STRING_OBJECT = 0x08;
export const ANY_DATE = 0x09;
export const ANY_REGEXP = 0x0a;
export const ANY_SHARED_ARRAY_BUFFER = 0x0b;
export const ANY_ARRAY_BUFFER = 0x0c;
export const ANY_ARRAY_BUFFER_VIEW = 0x0d;
export const ANY_MAP = 0x0e;
export const ANY_SET = 0x0f;
export const ANY_ARRAY = 0x10;
export const ANY_OBJECT = 0x11;
export const ANY_BIGINT = 0x12;
export const ANY_POINTER = 0x7f;
export const TRANSFERABLE = 0x7e;

// export type TAny =
//   typeof ANY_UNDEFINED
//   | typeof ANY_NULL
//   | typeof ANY_BOOLEAN
//   | typeof ANY_NUMBER
//   | typeof ANY_STRING
//   | typeof ANY_SYMBOL
//   | typeof ANY_BOOLEAN_OBJECT
//   | typeof ANY_NUMBER_OBJECT
//   | typeof ANY_STRING_OBJECT
//   | typeof ANY_DATE
//   | typeof ANY_REGEXP
//   | typeof ANY_SHARED_ARRAY_BUFFER
//   | typeof ANY_ARRAY_BUFFER
//   | typeof ANY_ARRAY_BUFFER_VIEW
//   | typeof ANY_MAP
//   | typeof ANY_SET
//   | typeof ANY_ARRAY
//   | typeof ANY_OBJECT
//   | typeof ANY_BIGINT
//   | typeof ANY_POINTER
// ;


export function IsPlainObject(value: any): boolean {
  if ((value === null) || (typeof value !== 'object')) {
    return false;
  }
  const proto: any = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const constructor: any = proto.hasOwnProperty('constructor') && proto.constructor;
  return (typeof constructor === 'function')
    && (constructor instanceof constructor)
    && (String(proto.constructor) === String(Object));
}


export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder();
export const tempUint8Array = new Uint8Array(1e6);
