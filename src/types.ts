export type NumberFrom0To255 = number;
export type NumberFrom0To1 = number;

export type HexString = string;
export type HashHexString = `#${HexString}`;
export type RgbString = `rgb(${string})`;
export type RgbaString = `rgba(${string})`;
export type HslString = `hsl(${string})`;
export type HslaString = `hsla(${string})`;

export type RgbObject = {
  r: NumberFrom0To255;
  g: NumberFrom0To255;
  b: NumberFrom0To255;
  a?: NumberFrom0To1;
};

export type Color =
  | HexString
  | HashHexString
  | RgbString
  | RgbaString
  | HslString
  | HslaString
  | RgbObject;
