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

  function parse(c) {
    return parseInt(c, 16);
  }

  const result = {
    r: parse(rawR),
    g: parse(rawG),
    b: parse(rawB),
  };

  if (rawA !== undefined) {
    result.a = Math.round((parse(rawA) / 255) * 100) / 100;
  }

  return result;
}

export function hexToRgb(hex) {
  const rgbObject = hexToRgbObject(hex);

  if (!rgbObject) {
    return null;
  }

  const {
    r, g, b, a,
  } = rgbObject;

  const rgb = `${r}, ${g}, ${b}`;

  if (a !== undefined) {
    return `rgba(${rgb}, ${a})`;
  }

  return `rgb(${rgb})`;
}

export function rgbToRgbObject(rgb) {
  if (!rgb) {
    return null;
  }

  const matchRgb = /^rgb\((\d{0,3}),\s?(\d{0,3}),\s?(\d{0,3})\)$/i.exec(rgb);
  const matchRgba = /^rgba\((\d{0,3}),\s?(\d{0,3}),\s?(\d{0,3}),\s?((0?\.)?\d{0,3})\)$/i.exec(rgb);

  if (matchRgb) {
    const [, r, g, b] = matchRgb;

    return {
      r: Number(r),
      g: Number(g),
      b: Number(b),
    };
  }

  if (matchRgba) {
    const [, r, g, b, a] = matchRgba;

    return {
      r: Number(r),
      g: Number(g),
      b: Number(b),
      a: Number(a),
    };
  }

  return null;
}

export function rgbToHex(rgb) {
  const rgbObject = rgbToRgbObject(rgb);

  if (!rgbObject) {
    return null;
  }

  const {
    r, g, b, a,
  } = rgbObject;

  function parse(c) {
    return `00${Number(c).toString(16)}`.slice(-2);
  }

  const rgbHex = `${parse(r)}${parse(g)}${parse(b)}`;

  if (a !== undefined) {
    return `#${rgbHex}${parse(Math.round(Number(a) * 255))}`;
  }

  return `#${rgbHex}`;
}
