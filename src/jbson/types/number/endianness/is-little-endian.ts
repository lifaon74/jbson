import { getLocalEndianness } from './get-local-endianness';

export const IS_LITTLE_ENDIAN = getLocalEndianness() === 'little';
