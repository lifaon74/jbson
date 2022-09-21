import { createObjectType } from '../types/object/create-object-type';
import { IObjectType, IObjectTypeProperty } from '../types/object/object-type.type';
import { IInferInputSet } from './infer-input-set.type';
import { inferUnknownType } from './infer-unknown-type';

export function inferObjectType(
  input: object,
  inputSet: IInferInputSet,
): IObjectType {
  return createObjectType(
    Object.entries(input)
      .map(([key, value]: [string, any]): IObjectTypeProperty => {
        return [
          key,
          inferUnknownType(value, inputSet),
        ];
      }),
  );
}
