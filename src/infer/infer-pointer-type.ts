import { POINTER_TYPE } from '../types/pointer/pointer-type.constant';
import { IPointerType } from '../types/pointer/pointer-type.type';
import { IUnknownType } from '../types/unknown/unknown-type.type';
import { IInferInputSet } from './infer-input-set.type';

export function inferPointerType<GInput, GType extends IUnknownType>(
  input: GInput,
  inputSet: IInferInputSet,
  callback: (input: GInput) => GType,
): GType | IPointerType {
  if (inputSet.has(input)) {
    return POINTER_TYPE;
  } else {
    inputSet.add(input);
    return callback(input);
  }
}
