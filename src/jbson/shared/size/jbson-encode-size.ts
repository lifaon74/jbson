import { WriteFunction } from '../write-function/write-function.type';

export function jbson_encode_size(
  write: WriteFunction,
  size: number,
): void {
  let byte: number;
  do {
    byte = (size & 0b01111111);
    size >>= 7;
    byte |= ((size !== 0) as any) << 7;
    write(byte);
  } while (size !== 0);
}
