import type {
  HashHexString,
  NumberFrom0To1,
  NumberFrom0To255,
  RgbaString,
  RgbObject,
  RgbString,
} from './types';

function numberColorToHex(color: NumberFrom0To255): string {
  return `0${Number(color).toString(16)}`.slice(-2);
}

function numberAlphaToHex(color: NumberFrom0To1): string {
  return numberColorToHex(Math.round(Number(color) * 255));
}

export function objectToHex(rgbObject?: RgbObject): HashHexString {
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

export function objectToRgb(rgbObject?: RgbObject | null): RgbString | RgbaString {
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
