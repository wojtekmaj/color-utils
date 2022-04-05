function hexColorToNumber(color) {
  return parseInt(color, 16);
}

function hexAlphaToNumber(color) {
  return Math.round((hexColorToNumber(color) / 255) * 100) / 100;
}

function numberColorToHex(color) {
  return `0${Number(color).toString(16)}`.slice(-2);
}

function numberAlphaToHex(color) {
  return numberColorToHex(Math.round(Number(color) * 255));
}

function objectToRgb(rgbObject) {
  if (!rgbObject) {
    return null;
  }

  const { r, g, b, a } = rgbObject;

  const rgb = [r, g, b].join(', ');

  if (a !== undefined && a !== 1) {
    return `rgba(${rgb}, ${a})`;
  }

  return `rgb(${rgb})`;
}

function objectToHex(rgbObject) {
  if (!rgbObject) {
    return null;
  }

  const { r, g, b, a } = rgbObject;

  const rgbHex = [r, g, b].map(numberColorToHex).join('');

  if (a !== undefined && a !== 1) {
    return `#${rgbHex}${numberAlphaToHex(a)}`;
  }

  return `#${rgbHex}`;
}

function objectToHsl(rgbObject) {
  if (!rgbObject) {
    return null;
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

function isRgbObject(rgbObject) {
  return (
    rgbObject &&
    typeof rgbObject === 'object' &&
    'r' in rgbObject &&
    'g' in rgbObject &&
    'b' in rgbObject
  );
}

function hexToObject(rawHex) {
  if (!rawHex) {
    return null;
  }

  // Expand shorthand form (e.g. "03f") to full form (e.g. "0033ff")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = rawHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  if (!match) {
    return null;
  }

  const [, rawR, rawG, rawB, rawA] = match;

  const result = {
    r: hexColorToNumber(rawR),
    g: hexColorToNumber(rawG),
    b: hexColorToNumber(rawB),
  };

  if (rawA !== undefined && rawA !== 'ff') {
    result.a = hexAlphaToNumber(rawA);
  }

  return result;
}

function hslToObject(hsl) {
  if (!hsl) {
    return null;
  }

  const match = /^hsla?\((\d{0,3}),\s?(\d{0,3})%,\s?(\d{0,3})%(,\s?((0?\.)?\d*))?\)$/i.exec(hsl);

  if (!match) {
    return null;
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

  const result = {
    r,
    g,
    b,
  };

  if (rawA !== undefined && rawA !== '1') {
    result.a = Number(rawA);
  }

  return result;
}

function rgbToObject(rgb) {
  if (!rgb) {
    return null;
  }

  const match = /^rgba?\((\d{0,3}),\s?(\d{0,3}),\s?(\d{0,3})(,\s?((0?\.)?\d*))?\)$/i.exec(rgb);

  if (!match) {
    return null;
  }

  const [, rawR, rawG, rawB, , rawA] = match;

  const result = {
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
export function toObject(color) {
  if (isRgbObject(color)) {
    return color;
  }

  return hexToObject(color) || rgbToObject(color) || hslToObject(color);
}

/**
 * Adds/changes alpha channel in a given color.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} a Alpha (0-1)
 * @returns {String} Color with alpha channel added/changed
 */
export function alpha(color, a) {
  const rgbObject = toObject(color);

  if (isNaN(a) || a === null || a === '') {
    return null;
  }

  return objectToRgb(rgbObject && { ...rgbObject, a });
}

function mixChannels(channel1, channel2, ratio) {
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
export function mix(color1, color2, ratio = 0.5) {
  if (!color1 || !color2) {
    return null;
  }

  if (isNaN(ratio)) {
    return null;
  }

  if (ratio === null || ratio === '') {
    ratio = 0.5;
  }

  const rgbObject1 = toObject(color1);
  const rgbObject2 = toObject(color2);

  if (!rgbObject1 || !rgbObject2) {
    return null;
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
export function mixWhite(color, ratio) {
  return mix(color, 'fff', ratio);
}

/**
 * Mixes color with black.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mixBlack(color, ratio) {
  return mix(color, '000', ratio);
}

/**
 * Converts color to hex format.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in hex format
 */
export function toHex(color) {
  const rgbObject = toObject(color);

  return objectToHex(rgbObject);
}

/**
 * Converts color to hsl(…) or hsla(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in hsl(…) or hsla(…) format, whichever is applicable
 */
export function toHsl(color) {
  const rgbObject = toObject(color);

  return objectToHsl(rgbObject);
}

/**
 * Converts color to rgb(…) or rgba(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…), hsl(…), hsla(…) or { r, g, b, a? } object
 * @returns {String} Color in rgb(…) or rgba(…) format, whichever is applicable
 */
export function toRgb(color) {
  const rgbObject = toObject(color);

  return objectToRgb(rgbObject);
}
