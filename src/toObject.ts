import type {
  Color,
  HashHexString,
  HexString,
  HslaString,
  HslString,
  NumberFrom0To1,
  NumberFrom0To255,
  RgbaString,
  RgbObject,
  RgbString,
} from './types.js';

function isRgbObject(rgbObject?: unknown): rgbObject is RgbObject {
  return (
    typeof rgbObject === 'object' &&
    rgbObject !== null &&
    'r' in rgbObject &&
    'g' in rgbObject &&
    'b' in rgbObject
  );
}

function hexColorToNumber(color: string): NumberFrom0To255 {
  return parseInt(color, 16);
}

function hexAlphaToNumber(color: string): NumberFrom0To1 {
  return Math.round((hexColorToNumber(color) / 255) * 100) / 100;
}

function hexToObject(rawHex: HexString | HashHexString): RgbObject {
  if (!rawHex) {
    throw new Error('hex is required');
  }

  // Expand shorthand form (e.g. "03f") to full form (e.g. "0033ff")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = rawHex.replace(
    shorthandRegex,
    (m: string, r: string, g: string, b: string) => r + r + g + g + b + b,
  );

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  if (!match) {
    throw new Error(
      'Invalid color provided. Expected color to match #rgb, #rgba, #rrggbb, or #rrggbbaa',
    );
  }

  const [, rawR, rawG, rawB, rawA] = match as unknown as [
    string,
    string,
    string,
    string,
    string | undefined,
  ];

  const result: RgbObject = {
    r: hexColorToNumber(rawR),
    g: hexColorToNumber(rawG),
    b: hexColorToNumber(rawB),
  };

  if (rawA !== undefined && rawA !== 'ff') {
    result.a = hexAlphaToNumber(rawA);
  }

  return result;
}

function hslToObject(hsl: HslString | HslaString): RgbObject {
  if (!hsl) {
    throw new Error('hsl is required');
  }

  const match =
    /^hsla?\((\d{0,3})(,\s?|\s{1,})(\d{0,3})%(,\s?|\s{1,})(\d{0,3})%((,\s?|\s?\/\s?)((0?\.)?\d*))?\)$/i.exec(
      hsl,
    );

  if (!match) {
    throw new Error(
      'Invalid color provided. Expected color to match hsl(h s l), hsl(h s l / a), hsl(h, s, l) or hsla(h, s, l, a)',
    );
  }

  // prettier-ignore
  const [
    /* full match */,
    rawH,
    /* space after H */,
    rawS,
    /* space after S */,
    rawL,
    /* full match of A */,
    /* space before A */,
    rawA,
  ] = match;

  const h60 = Number(rawH) / 60;
  const lRatio = Number(rawL) / 100;
  const sRatio = Number(rawS) / 100;

  const chroma = (1 - Math.abs(2 * lRatio - 1)) * sRatio;
  const secondLargest = chroma * (1 - Math.abs((h60 % 2) - 1));
  const lightness = lRatio - chroma / 2;

  let rRatio = 0;
  let gRatio = 0;
  let bRatio = 0;

  switch (true) {
    case h60 < 1:
      rRatio = chroma;
      gRatio = secondLargest;
      bRatio = 0;
      break;
    case h60 < 2:
      rRatio = secondLargest;
      gRatio = chroma;
      bRatio = 0;
      break;
    case h60 < 3:
      rRatio = 0;
      gRatio = chroma;
      bRatio = secondLargest;
      break;
    case h60 < 4:
      rRatio = 0;
      gRatio = secondLargest;
      bRatio = chroma;
      break;
    case h60 < 5:
      rRatio = secondLargest;
      gRatio = 0;
      bRatio = chroma;
      break;
    case h60 < 6:
      rRatio = chroma;
      gRatio = 0;
      bRatio = secondLargest;
      break;
  }

  const r = Math.round((rRatio + lightness) * 255);
  const g = Math.round((gRatio + lightness) * 255);
  const b = Math.round((bRatio + lightness) * 255);

  const result: RgbObject = {
    r,
    g,
    b,
  };

  if (rawA !== undefined && rawA !== '1') {
    result.a = Number(rawA);
  }

  return result;
}

function rgbToObject(rgb: RgbString | RgbaString): RgbObject {
  if (!rgb) {
    throw new Error('rgb is required');
  }

  const match =
    /^rgba?\((\d{0,3})(,\s?|\s{1,})(\d{0,3})(,\s?|\s{1,})(\d{0,3})((,\s?|\s?\/\s?)((0?\.)?\d*))?\)$/i.exec(
      rgb,
    );

  if (!match) {
    throw new Error(
      'Invalid color provided. Expected color to match rgb(r g b), rgb(r g b / a), rgb(r, g, b) or rgba(r, g, b, a)',
    );
  }

  // prettier-ignore
  const [
    /* full match */,
    rawR,
    /* space after R */,
    rawG,
    /* space after G */,
    rawB,
    /* full match of A */,
    /* space before A */,
    rawA,
  ] = match;

  const result: RgbObject = {
    r: Number(rawR),
    g: Number(rawG),
    b: Number(rawB),
  };

  if (rawA !== undefined && rawA !== '1') {
    result.a = Number(rawA);
  }

  return result;
}

/**
 * Converts color to { r, g, b, a? } object.
 *
 * @param {Color} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {RgbObject} Color as { r, g, b, a? } object
 */
export default function toObject(color: Color): RgbObject {
  if (isRgbObject(color)) {
    return color;
  }

  try {
    return hexToObject(color as HexString);
  } catch (e) {
    // Ignore
  }

  try {
    return rgbToObject(color as RgbString | RgbaString);
  } catch (e) {
    // Ignore
  }

  try {
    return hslToObject(color as HslString | HslaString);
  } catch (e) {
    // Ignore
  }

  throw new Error('Invalid color provided');
}
