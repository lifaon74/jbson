export type INullish =
  | undefined
  | null
  ;

export function ifNullish(
  input: unknown,
): input is INullish {
  return (input === void 0)
    || (input === null)
    ;
}
