import { ReadFunction } from '../read-function/read-function.type';

export function jbson_decode_bigint_size(
  read: ReadFunction,
): bigint {
  let size: bigint = 0n;
  let byte: number;
  let offset: bigint = 0n;
  do {
    byte = read();
    size |= (BigInt(byte) & 0b01111111n) << offset;
    offset += 7n;
  } while (byte & 0b10000000);
  return size;
}
