
// function * a() {
//   console.log(yield);
//   console.log(yield);
//   console.log(yield);
// }
//
//
// function * b() {
//   yield * a();
// }
//
// const it = b();
// console.log('r', it.next(1));
// console.log('r', it.next(2));
// console.log('r', it.next(3));
// console.log('r', it.next(4));
// console.log('r', it.next(5));



export function encode(iterable: Iterable<number>): Uint8Array {
  return new Uint8Array(Array.from(iterable));
}

export function decode<T>(buffer: Uint8Array, iterator: Iterator<void, T, number>): T {
  let result: IteratorResult<void, T>;
  let i: number = 0;
  let value: any = void 0;
  while (!(result = iterator.next(value)).done) {
    if (i < buffer.length) {
      value = buffer[i++];
    } else {
      throw new Error(`Not enough data`);
    }
  }
  return result.value as T;
}

// export function decode<T>(buffer: Uint8Array, iterable: IterableIterator<number, T>): T {
//   iterable.next();
//   let result: IteratorResult<T>;
//   let i: number = 0;
//   do {
//     if (i >= buffer.length) {
//       throw new Error(`Not enough data`);
//     }
//   } while (!(result = iterable.next(buffer[i++])).done);
//   // while (!(result = iterable.next(buffer[i++])).done) {}
//   return result.value;
// }
