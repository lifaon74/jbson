import { IPointerType } from '../types/pointer/pointer-type.type';
import { createSetType } from '../types/set/create-set-type';
import { ISetType } from '../types/set/set-type.type';
import { mergeTypesList } from '../types/unknown/merge-types-list';
import { IUnknownType } from '../types/unknown/unknown-type.type';
import { IInferInputSet } from './infer-input-set.type';
import { inferUnknownType } from './infer-unknown-type';

export function inferSetType(
  input: ReadonlySet<unknown>,
  inputSet: IInferInputSet,
): ISetType | IPointerType {
  return createSetType(
    mergeTypesList(
      Array.from(input.values()).map((item: unknown): IUnknownType => {
        return inferUnknownType(item, inputSet);
      }),
    ),
  );
}
