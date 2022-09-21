import { IUnknownType } from '../unknown/unknown-type.type';

export type IObjectTypeProperty<GType extends IUnknownType = IUnknownType> = [
  key: string,
  type: GType,
];

export type IObjectTypeProperties = readonly IObjectTypeProperty[];

export interface IObjectType {
  type: 'object';
  properties: IObjectTypeProperties;
}
