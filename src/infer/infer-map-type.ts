import { createMapType } from '../types/map/create-map-type';
import { IMapType } from '../types/map/map-type.type';
import { mergeTypesList } from '../types/unknown/merge-types-list';
import { IUnknownType } from '../types/unknown/unknown-type.type';
import { IInferInputSet } from './infer-input-set.type';
import { inferUnknownType } from './infer-unknown-type';

export function inferMapType(
  input: ReadonlyMap<unknown, unknown>,
  inputSet: IInferInputSet,
): IMapType {
  return createMapType(
    mergeTypesList(
      Array.from(input.keys())
        .map((key: unknown): IUnknownType => {
          return inferUnknownType(key, inputSet);
        }),
    ),
    mergeTypesList(
      Array.from(input.values())
        .map((value: unknown): IUnknownType => {
          return inferUnknownType(value, inputSet);
        }),
    ),
  );
}
