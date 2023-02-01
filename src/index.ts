type NumberFrom0To255 = number;
type NumberFrom0To1 = number;

type HexString = string;
type HashHexString = `#${HexString}`;
type RgbString = `rgb(${string})`;
type RgbaString = `rgba(${string})`;
type HslString = `hsl(${string})`;
type HslaString = `hsla(${string})`;

type RgbObject = {
  r: NumberFrom0To255;
  g: NumberFrom0To255;
  b: NumberFrom0To255;
  a?: NumberFrom0To1;
};

type Color =
  | HexString
  | HashHexString
  | RgbString
  | RgbaString
  | HslString
  | HslaString
  | RgbObject;

function hexColorToNumber(color: string): NumberFrom0To255 {
  return parseInt(color, 16);
}

function hexAlphaToNumber(color: string): NumberFrom0To1 {
  return Math.round((hexColorToNumber(color) / 255) * 100) / 100;
}

function numberColorToHex(color: NumberFrom0To255): string {
  return `0${Number(color).toString(16)}`.slice(-2);
}

function numberAlphaToHex(color: NumberFrom0To1): string {
  return numberColorToHex(Math.round(Number(color) * 255));
}

function objectToRgb(rgbObject?: RgbObject | null): RgbString | RgbaString {
  if (!rgbObject) {
    throw new Error('Missing rgbObject argument');
  }

  const { r, g, b, a } = rgbObject;

  const rgb = [r, g, b].join(', ');

  if (a !== undefined && a !== 1) {
    return `rgba(${rgb}, ${a})`;
  }

  return `rgb(${rgb})`;
}

function objectToHex(rgbObject?: RgbObject): HashHexString {
  if (!rgbObject) {
    throw new Error('Missing rgbObject argument');
  }

  const { r, g, b, a } = rgbObject;

  const rgbHex = [r, g, b].map(numberColorToHex).join('');

  if (a !== undefined && a !== 1) {
    return `#${rgbHex}${numberAlphaToHex(a)}`;
  }

  return `#${rgbHex}`;
}

function objectToHsl(rgbObject: RgbObject): HslString | HslaString {
  if (!rgbObject) {
    throw new Error('Missing rgbObject argument');
  }

  const { r, g, b, a } = rgbObject;

  const rRatio = r / 255;
  const gRatio = g / 255;
  const bRatio = b / 255;

  const minRatio = Math.min(rRatio, gRatio, bRatio);
  const maxRatio = Math.max(rRatio, gRatio, bRatio);
  const delta = maxRatio - minRatio;

  const h60 = (() => {
    if (!delta) {
      return 0;
    }

    if (maxRatio === rRatio) {
      return ((gRatio - bRatio) / delta) % 6;
    }

    if (maxRatio === gRatio) {
      return (bRatio - rRatio) / delta + 2;
    }

    if (maxRatio === bRatio) {
      return (rRatio - gRatio) / delta + 4;
    }

    return 0;
  })();
  const lRatio = (minRatio + maxRatio) / 2;
  const sRatio = delta ? delta / (1 - Math.abs(2 * lRatio - 1)) : 0;

  const h = (Math.round(h60 * 60) + 360) % 360;
  const s = Math.round(sRatio * 100);
  const l = Math.round(lRatio * 100);

  if (a !== undefined && a !== 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function isRgbObject(rgbObject?: unknown): rgbObject is RgbObject {
  return (
    typeof rgbObject === 'object' &&
    rgbObject !== null &&
    'r' in rgbObject &&
    'g' in rgbObject &&
    'b' in rgbObject
  );
}

function hexToObject(rawHex: HexString | HashHexString): RgbObject {
  if (!rawHex) {
    throw new Error('Missing hex argument');
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
    throw new Error('Missing hsl argument');
  }

  const match = /^hsla?\((\d{0,3}),\s?(\d{0,3})%,\s?(\d{0,3})%(,\s?((0?\.)?\d*))?\)$/i.exec(hsl);

  if (!match) {
    throw new Error(
      'Invalid color provided. Expected color to match hsl(h, s, l) or hsla(h, s, l, a)',
    );
  }

  const [, rawH, rawS, rawL, , rawA] = match;

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
    throw new Error('Missing rgb argument');
  }

  const match = /^rgba?\((\d{0,3}),\s?(\d{0,3}),\s?(\d{0,3})(,\s?((0?\.)?\d*))?\)$/i.exec(rgb);

  if (!match) {
    throw new Error(
      'Invalid color provided. Expected color to match rgb(r, g, b) or rgba(r, g, b, a)',
    );
  }

  const [, rawR, rawG, rawB, , rawA] = match;

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
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {Object} Color as { r, g, b, a? } object
 */
export function toObject(color: Color): RgbObject {
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

/**
 * Adds/changes alpha channel in a given color.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} a Alpha (0-1)
 * @returns {String} Color with alpha channel added/changed
 */
export function alpha(color: Color, a?: NumberFrom0To1): RgbString | RgbaString {
  if (!color) {
    throw new Error('Missing color argument');
  }

  if (a !== 0 && !a) {
    throw new Error('Missing alpha argument');
  }

  if (isNaN(a)) {
    throw new Error('Invalid alpha argument provided');
  }

  const rgbObject = toObject(color);

  return objectToRgb(rgbObject && { ...rgbObject, a });
}

function mixChannels(
  channel1: NumberFrom0To255,
  channel2: NumberFrom0To255,
  ratio: NumberFrom0To1,
): number {
  const channelA = channel1 * ratio;
  const channelB = channel2 * (1 - ratio);

  return Math.round(channelA + channelB);
}

/**
 * Mixes two colors together.
 *
 * @param {string|Object} color1 Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {string|Object} color2 Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mix(color1: Color, color2: Color, ratio: NumberFrom0To1 = 0.5): HashHexString {
  if (!color1) {
    throw new Error('Missing color1 argument');
  }

  if (!color2) {
    throw new Error('Missing color2 argument');
  }

  if (isNaN(ratio)) {
    throw new Error('Invalid ratio argument provided');
  }

  if (ratio !== 0 && !ratio) {
    ratio = 0.5;
  }

  const rgbObject1 = toObject(color1);
  const rgbObject2 = toObject(color2);

  if (!rgbObject1 || !rgbObject2) {
    throw new Error('Invalid color provided');
  }

  const { r: r1, g: g1, b: b1, a: a1 = 1 } = rgbObject1;
  const { r: r2, g: g2, b: b2, a: a2 = 1 } = rgbObject2;

  const ratioWithAlpha = ratio * (a1 / a2);

  const rgbObject = {
    r: mixChannels(r1, r2, ratioWithAlpha),
    g: mixChannels(g1, g2, ratioWithAlpha),
    b: mixChannels(b1, b2, ratioWithAlpha),
  };

  return objectToHex(rgbObject);
}

/**
 * Mixes color with white.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mixWhite(color: Color, ratio?: NumberFrom0To1): HashHexString {
  return mix(color, 'fff', ratio);
}

/**
 * Mixes color with black.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mixBlack(color: Color, ratio?: NumberFrom0To1): HashHexString {
  return mix(color, '000', ratio);
}

/**
 * Converts color to hex format.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in hex format
 */
export function toHex(color: Color): HashHexString {
  const rgbObject = toObject(color);

  return objectToHex(rgbObject);
}

/**
 * Converts color to hsl(…) or hsla(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in hsl(…) or hsla(…) format, whichever is applicable
 */
export function toHsl(color: Color): HslString | HslaString {
  const rgbObject = toObject(color);

  return objectToHsl(rgbObject);
}

/**
 * Converts color to rgb(…) or rgba(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in rgb(…) or rgba(…) format, whichever is applicable
 */
export function toRgb(color: Color): RgbString | RgbaString {
  const rgbObject = toObject(color);

  return objectToRgb(rgbObject);
}
