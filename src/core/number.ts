
export const NUMBER_TYPES_INT8 = 0x00;
export const NUMBER_TYPES_UINT8 = 0x01;
export const NUMBER_TYPES_INT16 = 0x02;
export const NUMBER_TYPES_UINT16 = 0x03;
export const NUMBER_TYPES_INT32 = 0x04;
export const NUMBER_TYPES_UINT32 = 0x05;
export const NUMBER_TYPES_INT64 = 0x06;
export const NUMBER_TYPES_UINT64 = 0x07;
export const NUMBER_TYPES_FLOAT32 = 0x08;
export const NUMBER_TYPES_FLOAT64 = 0x09;
// reserved
export const NUMBER_TYPES_INT128 = 0x0a;
export const NUMBER_TYPES_UINT128 = 0x0b;
export const NUMBER_TYPES_FLOAT128 = 0x0c;

export type TNumberType =
   typeof NUMBER_TYPES_INT8
  | typeof NUMBER_TYPES_UINT8
  | typeof NUMBER_TYPES_INT16
  | typeof NUMBER_TYPES_UINT16
  | typeof NUMBER_TYPES_INT32
  | typeof NUMBER_TYPES_UINT32
  | typeof NUMBER_TYPES_INT64
  | typeof NUMBER_TYPES_UINT64
  | typeof NUMBER_TYPES_FLOAT32
  | typeof NUMBER_TYPES_FLOAT64
;


export const MAX_INT8 = 0x7f;
export const MAX_UINT8 = 0xff;
export const MAX_INT16 = 0x7fff;
export const MAX_UINT16 = 0xffff;
export const MAX_INT32 = 0x7fffffff;
export const MAX_UINT32 = 0xffffffff;
export const MAX_INT64 = 0x7fffffffffffffff;
export const MAX_UINT64 = 0xffffffffffffffff;
export const MAX_FLOAT32 = (2 - (2 ** -23)) * (2 ** 127);


// const NumberTypeToTypeStringMap: { [key: number]: string } = {
//   [NUMBER_TYPES_INT8]: 'int8',
//   [NUMBER_TYPES_UINT8]: 'uint8',
//   [NUMBER_TYPES_INT16]: 'int16',
//   [NUMBER_TYPES_UINT16]: 'uint16',
//   [NUMBER_TYPES_INT32]: 'int32',
//   [NUMBER_TYPES_UINT16]: 'uint32',
//   [NUMBER_TYPES_INT64]: 'int64',
//   [NUMBER_TYPES_UINT64]: 'uint64',
//   [NUMBER_TYPES_FLOAT32]: 'float32',
//   [NUMBER_TYPES_FLOAT64]: 'float64',
// };
//
// /**
//  * Returns the type as a string
//  * @param {number} type
//  * @returns {string}
//  */
// export function NumberTypeToTypeString(type: TNumberType): string {
//   if (NumberTypeToTypeStringMap[type] === void 0) {
//     throw new TypeError(`Invalid type`);
//   } else {
//     return NumberTypeToTypeStringMap[type];
//   }
// }

// export function NumberTypeToTypeString(type: TNumberType): string {
//   switch (type) {
//     case NUMBER_TYPES_INT8:
//       return 'int8';
//     case NUMBER_TYPES_UINT8:
//       return 'uint8';
//     case NUMBER_TYPES_INT16:
//       return 'int16';
//     case NUMBER_TYPES_UINT16:
//       return 'unt8';
//     case NUMBER_TYPES_INT32:
//       return 'int32';
//     case NUMBER_TYPES_UINT32:
//       return 'uint32';
//     case NUMBER_TYPES_INT64:
//       return 'int64';
//     case NUMBER_TYPES_UINT64:
//       return 'unt64';
//     case NUMBER_TYPES_FLOAT32:
//       return 'float32';
//     case NUMBER_TYPES_FLOAT64:
//       return 'float64';
//     default:
//       throw new TypeError(`Invalid type`);
//   }
// }


const NumberTypeByteLengthMap: { [key: number]: number } = {
  [NUMBER_TYPES_INT8]: 1,
  [NUMBER_TYPES_UINT8]: 1,
  [NUMBER_TYPES_INT16]: 2,
  [NUMBER_TYPES_UINT16]: 2,
  [NUMBER_TYPES_INT32]: 4,
  [NUMBER_TYPES_UINT16]: 4,
  [NUMBER_TYPES_INT64]: 8,
  [NUMBER_TYPES_UINT64]: 8,
  [NUMBER_TYPES_FLOAT32]: 4,
  [NUMBER_TYPES_FLOAT64]: 8,
};

/**
 * Returns the byte length of the type
 * @param {number} type
 * @returns {number}
 */
export function NumberTypeByteLength(type: TNumberType): number {
  if (NumberTypeByteLengthMap[type] === void 0) {
    throw new TypeError(`Invalid type`);
  } else {
    return NumberTypeByteLengthMap[type];
  }
}

// export function NumberTypeByteLength(type: TNumberType): number {
//   switch (type) {
//     case NUMBER_TYPES_INT8:
//       return 1;
//     case NUMBER_TYPES_UINT8:
//       return 1;
//     case NUMBER_TYPES_INT16:
//       return 2;
//     case NUMBER_TYPES_UINT16:
//       return 2;
//     case NUMBER_TYPES_INT32:
//       return 4;
//     case NUMBER_TYPES_UINT32:
//       return 4;
//     case NUMBER_TYPES_INT64:
//       return 8;
//     case NUMBER_TYPES_UINT64:
//       return 8;
//     case NUMBER_TYPES_FLOAT32:
//       return 4;
//     case NUMBER_TYPES_FLOAT64:
//       return 8;
//     default:
//       throw new TypeError(`Invalid type`);
//   }
// }


/**
 * Returns true if the type is signed (can be negative)
 * @param {number} type
 * @return {boolean}
 */
export function IsSignedNumberType(type: TNumberType): boolean {
  switch (type) {
    case NUMBER_TYPES_INT8:
    case NUMBER_TYPES_INT16:
    case NUMBER_TYPES_INT32:
    case NUMBER_TYPES_INT64:
      return true;
    case NUMBER_TYPES_UINT8:
    case NUMBER_TYPES_UINT16:
    case NUMBER_TYPES_UINT32:
    case NUMBER_TYPES_UINT64:
      return false;
    default:
      throw new TypeError(`Invalid type`);
  }
}


/**
 * Returns the type of the buffer
 * @param {ArrayBufferView} buffer
 * @returns {number}
 */
export function ArrayBufferViewToNumberType(buffer: ArrayBufferView): TNumberType {
  if (buffer instanceof Float32Array) {
    return NUMBER_TYPES_FLOAT32;
  } else if (buffer instanceof Float64Array) {
    return NUMBER_TYPES_FLOAT64;
  } else if (buffer instanceof Int8Array) {
    return NUMBER_TYPES_INT8;
  } else if (buffer instanceof Uint8Array) {
    return NUMBER_TYPES_UINT8;
  } else if (buffer instanceof Int16Array) {
    return NUMBER_TYPES_INT16;
  } else if (buffer instanceof Uint16Array) {
    return NUMBER_TYPES_UINT16;
  } else if (buffer instanceof Int32Array) {
    return NUMBER_TYPES_INT32;
  } else if (buffer instanceof Uint32Array) {
    return NUMBER_TYPES_UINT32;
  } else {
    throw new TypeError(`Invalid buffer type`);
  }
}


const NumberTypeToArrayBufferViewConstructorMap: { [key: number]: new (...args: any[]) => ArrayBufferView } = {
  [NUMBER_TYPES_INT8]: Int8Array,
  [NUMBER_TYPES_UINT8]: Uint8Array,
  [NUMBER_TYPES_INT16]: Int16Array,
  [NUMBER_TYPES_UINT16]: Uint16Array,
  [NUMBER_TYPES_INT32]: Int32Array,
  [NUMBER_TYPES_UINT16]: Uint32Array,
  [NUMBER_TYPES_FLOAT32]: Float32Array,
  [NUMBER_TYPES_FLOAT64]: Float64Array,
};

/**
 * Returns an ArrayBufferView according to the type
 * @param {number} type
 * @returns {{new(...args: any[]) => ArrayBufferView}}
 */
export function NumberTypeToArrayBufferViewConstructor(type: TNumberType): new (...args: any[]) => ArrayBufferView {
  if (NumberTypeToArrayBufferViewConstructorMap[type] === void 0) {
    throw new TypeError(`Invalid type`);
  } else {
    return NumberTypeToArrayBufferViewConstructorMap[type];
  }
}

// export function NumberTypeToArrayBufferViewConstructor(type: TNumberType): new (...args: any[]) => ArrayBufferView {
//   switch (type) {
//     case NUMBER_TYPES_INT8:
//       return Int8Array;
//     case NUMBER_TYPES_UINT8:
//       return Uint8Array;
//     case NUMBER_TYPES_INT16:
//       return Int16Array;
//     case NUMBER_TYPES_UINT16:
//       return Uint16Array;
//     case NUMBER_TYPES_INT32:
//       return Int32Array;
//     case NUMBER_TYPES_UINT32:
//       return Uint32Array;
//     case NUMBER_TYPES_INT64:
//     case NUMBER_TYPES_UINT64:
//       throw new TypeError(`No ArrayBufferView for type ${NumberTypeToTypeString(type)}`);
//     case NUMBER_TYPES_FLOAT32:
//       return Float32Array;
//     case NUMBER_TYPES_FLOAT64:
//       return Float64Array;
//     default:
//       throw new TypeError(`Invalid type`);
//   }
// }


/**
 * Infers the best type for 'number'
 * @param {number} number
 * @returns {number}
 */
export function InferNumberTypeOfNumber(number: number): TNumberType {
  const absoluteValue: number = Math.abs(number);

  if (Number.isSafeInteger(number)) {
    if (number < 0) {
      if (absoluteValue <= MAX_INT8) {
        return NUMBER_TYPES_INT8;
      } else if (absoluteValue <= MAX_INT16) {
        return NUMBER_TYPES_INT16;
      } else if (absoluteValue <= MAX_INT32) {
        return NUMBER_TYPES_INT32;
      } else if (absoluteValue <= MAX_INT64) {
        return NUMBER_TYPES_INT64;
      } else {
        throw new RangeError(`Invalid number`);
      }
    } else {
      if (number <= MAX_UINT8) {
        return NUMBER_TYPES_UINT8;
      } else if (number <= MAX_UINT16) {
        return NUMBER_TYPES_UINT16;
      } else if (number <= MAX_UINT32) {
        return NUMBER_TYPES_UINT32;
      } else if (number <= MAX_UINT64) {
        return NUMBER_TYPES_UINT64;
      } else {
        throw new RangeError(`Invalid number`);
      }
    }
  } else {
    if (absoluteValue > MAX_FLOAT32) {
      return NUMBER_TYPES_FLOAT64;
    } else {
      return NUMBER_TYPES_FLOAT32;
    }
  }
}


/**
 * Stores an number defined by its type into a DataView
 * @param number
 * @param type
 * @param dataView
 * @param offset
 * @param littleEndian
 */
export function SetNumberInDataView(number: number, type: TNumberType, dataView: DataView, offset: number = 0, littleEndian: boolean = false): void {
  switch (type) {
    case NUMBER_TYPES_INT8:
      dataView.setInt8(offset, number);
      break;
    case NUMBER_TYPES_UINT8:
      dataView.setUint8(offset, number);
      break;
    case NUMBER_TYPES_INT16:
      dataView.setInt16(offset, number, littleEndian);
      break;
    case NUMBER_TYPES_UINT16:
      dataView.setUint16(offset, number, littleEndian);
      break;
    case NUMBER_TYPES_INT32:
      dataView.setInt32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES_UINT32:
      dataView.setUint32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES_INT64:
      dataView.setInt32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES_UINT64:
      if (littleEndian) {
        dataView.setUint32(offset, number, littleEndian);
        dataView.setUint32(offset + 4, number / 0x100000000, littleEndian);
      } else {
        dataView.setUint32(offset, number / 0x100000000, littleEndian);
        dataView.setUint32(offset + 4, number, littleEndian);
      }
      break;
    case NUMBER_TYPES_FLOAT32:
      dataView.setFloat32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES_FLOAT64:
      dataView.setFloat64(offset, number, littleEndian);
      break;
    default:
      throw new TypeError(`Invalid type`);
  }
}

/**
 * Gets a number defined by its type from a DataView
 * @param type
 * @param dataView
 * @param offset
 * @param littleEndian
 */
export function GetNumberInDataView(type: TNumberType, dataView: DataView, offset: number = 0, littleEndian: boolean = false): number {
  switch (type) {
    case NUMBER_TYPES_INT8:
      return dataView.getInt8(offset);
    case NUMBER_TYPES_UINT8:
      return dataView.getUint8(offset);
    case NUMBER_TYPES_INT16:
      return dataView.getInt16(offset, littleEndian);
    case NUMBER_TYPES_UINT16:
      return dataView.getUint16(offset, littleEndian);
    case NUMBER_TYPES_INT32:
      return dataView.getInt32(offset, littleEndian);
    case NUMBER_TYPES_UINT32:
      return dataView.getUint32(offset, littleEndian);
    case NUMBER_TYPES_INT64:
      return dataView.getInt32(offset, littleEndian);
    case NUMBER_TYPES_UINT64:
      if (littleEndian) {
        return dataView.getUint32(offset, littleEndian) + (dataView.getUint32(offset + 4, littleEndian) * 0x100000000);
      } else {
        return (dataView.getUint32(offset, littleEndian) * 0x100000000) + dataView.getUint32(offset + 4, littleEndian);
      }
    case NUMBER_TYPES_FLOAT32:
      return dataView.getFloat32(offset, littleEndian);
    case NUMBER_TYPES_FLOAT64:
      return dataView.getFloat64(offset, littleEndian);
    default:
      throw new TypeError(`Invalid type`);
  }
}













