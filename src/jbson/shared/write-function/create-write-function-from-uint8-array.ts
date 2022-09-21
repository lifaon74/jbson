import { WriteFunction } from './write-function.type';

export function createWriteFunctionFromUint8Array<GResult>(
  array: Uint8Array,
  callback: (write: WriteFunction) => GResult,
): [Uint8Array, GResult] {
  const length: number = array.length;
  let i: number = 0;

  const result: GResult = callback((byte: number): void => {
    if (i < length) {
      array[i++] = byte;
    } else {
      throw new Error(`Full: tried to write data on a full Uint8Array`);
    }
  });

  return [
    array.subarray(0, i),
    result,
  ];
}
