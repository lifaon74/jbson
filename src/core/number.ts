
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

export const MAX = {
  INT8: 0x7f,
  UINT8: 0xff,
  INT16: 0x7fff,
  UINT16: 0xffff,
  INT32: 0x7fffffff,
  UINT32: 0xffffffff,
  INT64: 0x7fffffffffffffff,
  UINT64: 0xffffffffffffffff,
  FLOAT32:  (2 - (2 ** -23)) * (2 ** 127),
};


/**
 * Returns the type as a string
 * @param {number} type
 * @returns {string}
 */
export function NumberTypeToTypeString(type: NUMBER_TYPES): string {
  switch (type) {
    case NUMBER_TYPES.INT8:
      return 'int8';
    case NUMBER_TYPES.UINT8:
      return 'uint8';
    case NUMBER_TYPES.INT16:
      return 'int16';
    case NUMBER_TYPES.UINT16:
      return 'unt8';
    case NUMBER_TYPES.INT32:
      return 'int32';
    case NUMBER_TYPES.UINT32:
      return 'uint32';
    case NUMBER_TYPES.INT64:
      return 'int64';
    case NUMBER_TYPES.UINT64:
      return 'unt64';
    case NUMBER_TYPES.FLOAT32:
      return 'float32';
    case NUMBER_TYPES.FLOAT64:
      return 'float64';
    default:
      throw new TypeError(`Invalid type`);
  }
}

/**
 * Returns the byte length of the type
 * @param {number} type
 * @returns {number}
 */
export function NumberTypeByteLength(type: NUMBER_TYPES): number {
  switch (type) {
    case NUMBER_TYPES.INT8:
      return 1;
    case NUMBER_TYPES.UINT8:
      return 1;
    case NUMBER_TYPES.INT16:
      return 2;
    case NUMBER_TYPES.UINT16:
      return 2;
    case NUMBER_TYPES.INT32:
      return 4;
    case NUMBER_TYPES.UINT32:
      return 4;
    case NUMBER_TYPES.INT64:
      return 8;
    case NUMBER_TYPES.UINT64:
      return 8;
    case NUMBER_TYPES.FLOAT32:
      return 4;
    case NUMBER_TYPES.FLOAT64:
      return 8;
    default:
      throw new TypeError(`Invalid type`);
  }
}



/**
 * Returns true if the type is signed (can be negative)
 * @param {number} type
 * @return {boolean}
 */
export function IsSignedNumberType(type: NUMBER_TYPES): boolean {
  switch (type) {
    case NUMBER_TYPES.INT8:
    case NUMBER_TYPES.INT16:
    case NUMBER_TYPES.INT32:
    case NUMBER_TYPES.INT64:
      return true;
    case NUMBER_TYPES.UINT8:
    case NUMBER_TYPES.UINT16:
    case NUMBER_TYPES.UINT32:
    case NUMBER_TYPES.UINT64:
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
export function ArrayBufferViewToNumberType(buffer: ArrayBufferView): NUMBER_TYPES {
  if (buffer instanceof Float32Array) {
    return NUMBER_TYPES.FLOAT32;
  } else if (buffer instanceof Float64Array) {
    return NUMBER_TYPES.FLOAT64;
  } else if (buffer instanceof Int8Array) {
    return NUMBER_TYPES.INT8;
  } else if (buffer instanceof Uint8Array) {
    return NUMBER_TYPES.UINT8;
  } else if (buffer instanceof Int16Array) {
    return NUMBER_TYPES.INT16;
  } else if (buffer instanceof Uint16Array) {
    return NUMBER_TYPES.UINT16;
  } else if (buffer instanceof Int32Array) {
    return NUMBER_TYPES.INT32;
  } else if (buffer instanceof Uint32Array) {
    return NUMBER_TYPES.UINT32;
  } else {
    throw new TypeError(`Invalid buffer type`);
  }
}

/**
 * Returns an ArrayBufferView according to the type
 * @param {number} type
 * @returns {{new(...args: any[]) => ArrayBufferView}}
 */
export function NumberTypeToArrayBufferViewConstructor(type: NUMBER_TYPES): new (...args: any[]) => ArrayBufferView {
  switch (type) {
    case NUMBER_TYPES.INT8:
      return Int8Array;
    case NUMBER_TYPES.UINT8:
      return Uint8Array;
    case NUMBER_TYPES.INT16:
      return Int16Array;
    case NUMBER_TYPES.UINT16:
      return Uint16Array;
    case NUMBER_TYPES.INT32:
      return Int32Array;
    case NUMBER_TYPES.UINT32:
      return Uint32Array;
    case NUMBER_TYPES.INT64:
    case NUMBER_TYPES.UINT64:
      throw new TypeError(`No ArrayBufferView for type ${NumberTypeToTypeString(type)}`);
    case NUMBER_TYPES.FLOAT32:
      return Float32Array;
    case NUMBER_TYPES.FLOAT64:
      return Float64Array;
    default:
      throw new TypeError(`Invalid type`);
  }
}


/**
 * Infers the best type for 'number'
 * @param {number} number
 * @returns {number}
 */
export function InferNumberTypeOfNumber(number: number): NUMBER_TYPES {
  const absoluteValue: number = Math.abs(number);

  if (Number.isSafeInteger(number)) {
    if (number < 0) {
      if (absoluteValue <= MAX.INT8) {
        return NUMBER_TYPES.INT8;
      } else if (absoluteValue <= MAX.INT16) {
        return NUMBER_TYPES.INT16;
      } else if (absoluteValue <= MAX.INT32) {
        return NUMBER_TYPES.INT32;
      } else if (absoluteValue <= MAX.INT64) {
        return NUMBER_TYPES.INT64;
      } else {
        throw new RangeError(`Invalid number`);
      }
    } else {
      if (number <= MAX.UINT8) {
        return NUMBER_TYPES.UINT8;
      } else if (number <= MAX.UINT16) {
        return NUMBER_TYPES.UINT16;
      } else if (number <= MAX.UINT32) {
        return NUMBER_TYPES.UINT32;
      } else if (number <= MAX.UINT64) {
        return NUMBER_TYPES.UINT64;
      } else {
        throw new RangeError(`Invalid number`);
      }
    }
  } else {
    if (absoluteValue > MAX.FLOAT32) {
      return NUMBER_TYPES.FLOAT64;
    } else {
      return NUMBER_TYPES.FLOAT32;
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
export function SetNumberInDataView(number: number, type: NUMBER_TYPES, dataView: DataView, offset: number = 0, littleEndian: boolean = false): void {
  switch (type) {
    case NUMBER_TYPES.INT8:
      dataView.setInt8(offset, number);
      break;
    case NUMBER_TYPES.UINT8:
      dataView.setUint8(offset, number);
      break;
    case NUMBER_TYPES.INT16:
      dataView.setInt16(offset, number, littleEndian);
      break;
    case NUMBER_TYPES.UINT16:
      dataView.setUint16(offset, number, littleEndian);
      break;
    case NUMBER_TYPES.INT32:
      dataView.setInt32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES.UINT32:
      dataView.setUint32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES.INT64:
      dataView.setInt32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES.UINT64:
      if (littleEndian) {
        dataView.setUint32(offset, number, littleEndian);
        dataView.setUint32(offset + 4, number / 0x100000000, littleEndian);
      } else {
        dataView.setUint32(offset, number / 0x100000000, littleEndian);
        dataView.setUint32(offset + 4, number, littleEndian);
      }
      break;
    case NUMBER_TYPES.FLOAT32:
      dataView.setFloat32(offset, number, littleEndian);
      break;
    case NUMBER_TYPES.FLOAT64:
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
export function GetNumberInDataView(type: NUMBER_TYPES, dataView: DataView, offset: number = 0, littleEndian: boolean = false): number {
  switch (type) {
    case NUMBER_TYPES.INT8:
      return dataView.getInt8(offset);
    case NUMBER_TYPES.UINT8:
      return dataView.getUint8(offset);
    case NUMBER_TYPES.INT16:
      return dataView.getInt16(offset, littleEndian);
    case NUMBER_TYPES.UINT16:
      return dataView.getUint16(offset, littleEndian);
    case NUMBER_TYPES.INT32:
      return dataView.getInt32(offset, littleEndian);
    case NUMBER_TYPES.UINT32:
      return dataView.getUint32(offset, littleEndian);
    case NUMBER_TYPES.INT64:
      return dataView.getInt32(offset, littleEndian);
    case NUMBER_TYPES.UINT64:
      if (littleEndian) {
        return dataView.getUint32(offset, littleEndian) + (dataView.getUint32(offset + 4, littleEndian) * 0x100000000);
      } else {
        return (dataView.getUint32(offset, littleEndian) * 0x100000000) + dataView.getUint32(offset + 4, littleEndian);
      }
    case NUMBER_TYPES.FLOAT32:
      return dataView.getFloat32(offset, littleEndian);
    case NUMBER_TYPES.FLOAT64:
      return dataView.getFloat64(offset, littleEndian);
    default:
      throw new TypeError(`Invalid type`);
  }
}













