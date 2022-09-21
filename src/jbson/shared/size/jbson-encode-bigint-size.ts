import { WriteFunction } from '../write-function/write-function.type';

export function jbson_encode_bigint_size(
  write: WriteFunction,
  size: bigint,
): void {
  let byte: number;
  do {
    byte = Number(size & 0b01111111n);
    size >>= 7n;
    byte |= ((size !== 0n) as any) << 7;
    write(byte);
  } while (size !== 0n);
}
