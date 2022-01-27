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

  if (a !== undefined) {
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

  if (a !== undefined) {
    return `#${rgbHex}${numberAlphaToHex(a)}`;
  }

  return `#${rgbHex}`;
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

  if (rawA !== undefined) {
    result.a = hexAlphaToNumber(rawA);
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

  if (rawA !== undefined) {
    result.a = Number(rawA);
  }

  return result;
}

/**
 * Converts color to { r, g, b, a? } object.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @returns {Object} Color as { r, g, b, a? } object
 */
export function toObject(color) {
  if (isRgbObject(color)) {
    return color;
  }

  return hexToObject(color) || rgbToObject(color);
}

/**
 * Adds/changes alpha channel in a given color.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @param {number} a Alpha (0-1)
 * @returns {String} Color with alpha channel added/changed
 */
export function alpha(color, a) {
  const rgbObject = toObject(color);

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
 * @param {string|Object} color1 Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @param {string|Object} color2 Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mix(color1, color2, ratio = 0.5) {
  if (!color1 || !color2) {
    return null;
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
 * @param {string|Object} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mixWhite(color, ratio) {
  return mix(color, 'fff', ratio);
}

/**
 * Mixes color with black.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @param {number} [ratio=0.5] Ratio at which colors should be mixed
 * @returns {String} Color in hex format
 */
export function mixBlack(color, ratio) {
  return mix(color, '000', ratio);
}

/**
 * Converts color to hex format.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @returns {String} Color in hex format
 */
export function toHex(color) {
  const rgbObject = toObject(color);

  return objectToHex(rgbObject);
}

/**
 * Converts color to rgb(…) or rgba(…) format, whichever is applicable.
 *
 * @param {string|Object} color Color as hex, rgb(…), rgba(…) or { r, g, b, a? } object
 * @returns {String} Color in rgb(…) or rgba(…) format, whichever is applicable
 */
export function toRgb(color) {
  const rgbObject = toObject(color);

  return objectToRgb(rgbObject);
}
