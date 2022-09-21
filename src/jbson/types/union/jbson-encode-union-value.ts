import { inferUnknownType } from '../../../infer/infer-unknown-type';
import { POINTER_TYPE } from '../../../types/pointer/pointer-type.constant';
import { IUnionType } from '../../../types/union/union-type.type';
import { compareUnknownTypes } from '../../../types/unknown/compare-unknown-types';
import { IUnknownType } from '../../../types/unknown/unknown-type.type';
import { PointerMap } from '../../classes/pointer-map.class';
import { jbson_encode_size } from '../../shared/size/jbson-encode-size';
import { WriteFunction } from '../../shared/write-function/write-function.type';
import { jbson_encode_unknown_value } from '../unknown/jbson-encode-unknown-value';

export function jbson_encode_union_value(
  write: WriteFunction,
  type: IUnionType,
  input: unknown,
  pointerMap: PointerMap,
): void {
  // TODO not really accurate
  const valueType: IUnknownType = pointerMap.hasValue(input)
    ? POINTER_TYPE
    : inferUnknownType(input, new Set());

  const index: number = type.types.findIndex((type: IUnknownType): boolean => {
    return compareUnknownTypes(valueType, type);
  });

  if (index === -1) {
    throw new Error(`Unable to find type into the union`);
  } else {
    jbson_encode_size(write, index);
    jbson_encode_unknown_value(write, type.types[index], input, pointerMap);
  }
}
