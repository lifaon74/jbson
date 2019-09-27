export type Pointer = number;
export type GetPointerFunction = () => Pointer;

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
