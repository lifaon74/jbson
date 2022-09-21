import { IArrayType } from '../types/array/array-type.type';
import { createArrayType } from '../types/array/create-array-type';
import { mergeTypesList } from '../types/unknown/merge-types-list';
import { IUnknownType } from '../types/unknown/unknown-type.type';
import { IInferInputSet } from './infer-input-set.type';
import { inferUnknownType } from './infer-unknown-type';

export function inferArrayType(
  input: readonly unknown[],
  inputSet: IInferInputSet,
): IArrayType {
  return createArrayType(
    mergeTypesList(
      input.map((item: unknown): IUnknownType => {
        return inferUnknownType(item, inputSet);
      }),
    ),
  );
}
