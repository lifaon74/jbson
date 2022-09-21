import { ReadFunction } from '../read-function/read-function.type';

export function jbson_decode_size(
  read: ReadFunction,
): number {
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
