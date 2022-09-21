const OBJECT_PROTOTYPE = Object.getPrototypeOf({});

export function isPlainObject(
  input: any,
): input is object {
  return (Object.getPrototypeOf(input) === OBJECT_PROTOTYPE);
}

