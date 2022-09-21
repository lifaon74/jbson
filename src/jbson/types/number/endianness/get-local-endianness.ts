// let localEndianness = () => {
//   let uInt32 = new Uint32Array([0x12345678]); // have a 4 bytes long thing
//   let uInt8 = new Uint8Array(uInt32.buffer); // split it in 1 byte long things
//   // Now, uInt8[0] returns the first byte of uInt32 according to the machine running this program.
//   if(uInt8[0] === 0x78) { // here we got the byte of lesser order
//     return 'little';
//   } else if (uInt8[0] === 0x12) { // here we got the byte of bigger order
//     return 'big';
//   } else { // you may check for older or stranger behaviours here, and even endianness on bits rather than bytes if needed. But hey, ECMAScript languages usually don't run on such rare machines.
//     return 'mixed'; // mixed yes, but how mixed ?
//   }
// };

export type Endianness =
  | 'little'
  | 'big'
  | 'mixed'
  ;

export function getLocalEndianness(): Endianness {
  const uInt32 = new Uint32Array([0x12345678]);
  const uInt8 = new Uint8Array(uInt32.buffer);
  if (uInt8[0] === 0x78) {
    return 'little';
  } else if (uInt8[0] === 0x12) {
    return 'big';
  } else {
    return 'mixed';
  }
}

