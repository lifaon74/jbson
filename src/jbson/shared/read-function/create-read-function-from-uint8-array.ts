import { ReadFunction } from './read-function.type';

export function createReadFunctionFromUint8Array<GResult>(
  array: Uint8Array,
  callback: (read: ReadFunction) => GResult,
): [Uint8Array, GResult] {
  const length: number = array.length;
  let i: number = 0;

  const result: GResult = callback((): number => {
    if (i < length) {
      return array[i++];
    } else {
      throw new Error(`Empty: tried to read data on an empty Uint8Array`);
    }
  });

  return [
    array.subarray(i),
    result,
  ];
}
