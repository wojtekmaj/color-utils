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

function rgbObjectToRgb(rgbObject) {
  if (!rgbObject) {
    return null;
  }

  const {
    r, g, b, a,
  } = rgbObject;

  const rgb = [r, g, b].join(', ');

  if (a !== undefined) {
    return `rgba(${rgb}, ${a})`;
  }

  return `rgb(${rgb})`;
}

function rgbObjectToHex(rgbObject) {
  if (!rgbObject) {
    return null;
  }

  const {
    r, g, b, a,
  } = rgbObject;

  const rgbHex = [r, g, b].map(numberColorToHex).join('');

  if (a !== undefined) {
    return `#${rgbHex}${numberAlphaToHex(a)}`;
  }

  return `#${rgbHex}`;
}

function isRgbObject(rgbObject) {
  return (
    rgbObject
    && typeof rgbObject === 'object'
    && 'r' in rgbObject
    && 'g' in rgbObject
    && 'b' in rgbObject
  );
}

export function hexToRgbObject(rawHex) {
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

export function hexToRgb(hex) {
  const rgbObject = hexToRgbObject(hex);

  return rgbObjectToRgb(rgbObject);
}

export function rgbToRgbObject(rgb) {
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

export function rgbToHex(rgb) {
  const rgbObject = rgbToRgbObject(rgb);

  return rgbObjectToHex(rgbObject);
}

function toRgbObject(hexOrRgb) {
  if (isRgbObject(hexOrRgb)) {
    return hexOrRgb;
  }

  return hexToRgbObject(hexOrRgb) || rgbToRgbObject(hexOrRgb);
}

export function addAlpha(hexOrRgb, a) {
  const rgbObject = toRgbObject(hexOrRgb);

  if (!rgbObject) {
    return null;
  }

  return rgbObjectToRgb({ ...rgbObject, a });
}

function mixChannels(channel1, channel2, ratio) {
  const channelA = channel1 * ratio;
  const channelB = channel2 * (1 - ratio);

  return Math.round(channelA + channelB);
}

export function mixColors(color1, color2, ratio) {
  if (!color1 || !color2) {
    return null;
  }

  const rgbObject1 = toRgbObject(color1);
  const rgbObject2 = toRgbObject(color2);

  if (!rgbObject1 || !rgbObject2) {
    return null;
  }

  const { r: r1, g: g1, b: b1 } = rgbObject1;
  const { r: r2, g: g2, b: b2 } = rgbObject2;

  const rgbObject = {
    r: mixChannels(r1, r2, ratio),
    g: mixChannels(g1, g2, ratio),
    b: mixChannels(b1, b2, ratio),
  };

  return rgbObjectToHex(rgbObject);
}

export function mixWhite(hexOrRgb, a) {
  return mixColors(hexOrRgb, '#fff', a);
}

export function mixBlack(hexOrRgb, a) {
  return mixColors(hexOrRgb, '#000', a);
}
