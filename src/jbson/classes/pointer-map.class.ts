export class PointerMap {
  protected _valueToIdMap: Map<unknown, number>;
  protected _idToValueMap: Map<number, unknown>;

  constructor() {
    this._valueToIdMap = new Map<unknown, number>();
    this._idToValueMap = new Map<number, unknown>();
  }

  add(
    input: unknown,
  ): number {
    if (this._valueToIdMap.has(input)) {
      throw new Error(`Value already present in the PointerMap`);
    } else {
      const id: number = this._valueToIdMap.size;
      this._valueToIdMap.set(input, id);
      this._idToValueMap.set(id, input);
      return id;
    }
  }

  hasValue(
    input: unknown,
  ): boolean {
    return this._valueToIdMap.has(input);
  }

  getId(
    input: unknown,
  ): number {
    let id: number | undefined = this._valueToIdMap.get(input);
    if (id === void 0) {
      throw new Error(`Not present in the PointerMap`);
    } else {
      return id;
    }
  }

  getValue(
    id: number,
  ): unknown {
    let value: unknown | undefined = this._idToValueMap.get(id);
    if (value === void 0) {
      throw new Error(`Not present in the PointerMap`);
    } else {
      return value;
    }
  }
}
