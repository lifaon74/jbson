export const DATA_VIEW_BUFFER = new ArrayBuffer(8);
export const DATA_VIEW = new DataView(DATA_VIEW_BUFFER);
export const DATA_VIEW_UINT8_ARRAY_1 = new Uint8Array(DATA_VIEW_BUFFER, 0, 1); // 8b
export const DATA_VIEW_UINT8_ARRAY_2 = new Uint8Array(DATA_VIEW_BUFFER, 0, 2); // 16b
export const DATA_VIEW_UINT8_ARRAY_4 = new Uint8Array(DATA_VIEW_BUFFER, 0, 4); // 32b
export const DATA_VIEW_UINT8_ARRAY_8 = new Uint8Array(DATA_VIEW_BUFFER, 0, 8); // 64b

