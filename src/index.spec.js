import { alpha, mix, mixBlack, mixWhite, toHex, toHsl, toObject, toRgb } from './index';

const colors = {
  white: {
    hex: '#ffffff',
    hexAlpha: '#ffffffff',
    hexShort: '#fff',
    rgb: 'rgb(255, 255, 255)',
    rgbNoSpace: 'rgb(255,255,255)',
    rgba: 'rgba(255, 255, 255, 1)',
    rgbaNoSpace: 'rgba(255,255,255,1)',
    hsl: 'hsl(0, 0%, 100%)',
    hslNoSpace: 'hsl(0,0%,100%)',
    hsla: 'hsla(0, 0%, 100%, 1)',
    hslaNoSpace: 'hsla(0,0%,100%,1)',
    object: { r: 255, g: 255, b: 255 },
  },
  semiWhite: {
    hex: undefined,
    hexAlpha: '#ffffff80',
    hexShort: undefined,
    rgb: undefined,
    rgbNoSpace: undefined,
    rgba: 'rgba(255, 255, 255, 0.5)',
    rgbaNoSpace: 'rgba(255,255,255,0.5)',
    hsl: undefined,
    hslNoSpace: undefined,
    hsla: 'hsla(0, 0%, 100%, 0.5)',
    hslaNoSpace: 'hsla(0,0%,100%,0.5)',
    object: { r: 255, g: 255, b: 255, a: 0.5 },
  },
  black: {
    hex: '#000000',
    hexAlpha: '#000000ff',
    hexShort: '#000',
    rgb: 'rgb(0, 0, 0)',
    rgbNoSpace: 'rgb(0,0,0)',
    rgba: 'rgba(0, 0, 0, 1)',
    rgbaNoSpace: 'rgba(0,0,0,1)',
    hsl: 'hsl(0, 0%, 0%)',
    hslNoSpace: 'hsl(0,0%,0%)',
    hsla: 'hsla(0, 0%, 0%, 1)',
    hslaNoSpace: 'hsla(0,0%,0%,1)',
    object: { r: 0, g: 0, b: 0 },
  },
  gray: {
    hex: '#808080',
    hexAlpha: '#808080ff',
    rgb: 'rgb(128, 128, 128)',
    rgbNoSpace: 'rgb(128,128,128)',
    rgba: 'rgba(128, 128, 128, 1)',
    rgbaNoSpace: 'rgba(128,128,128,1)',
    hsl: 'hsl(0, 0%, 50%)',
    hslNoSpace: 'hsl(0,0%,50%)',
    hsla: 'hsla(0, 0%, 50%, 1)',
    hslaNoSpace: 'hsla(0,0%,50%,1)',
    object: { r: 128, g: 128, b: 128 },
  },
  red: {
    hex: '#ff0000',
    hexAlpha: '#ff0000ff',
    hexShort: '#f00',
    rgb: 'rgb(255, 0, 0)',
    rgbNoSpace: 'rgb(255,0,0)',
    rgba: 'rgba(255, 0, 0, 1)',
    rgbaNoSpace: 'rgba(255,0,0,1)',
    hsl: 'hsl(0, 100%, 50%)',
    hslNoSpace: 'hsl(0,100%,50%)',
    hsla: 'hsla(0, 100%, 50%, 1)',
    hslaNoSpace: 'hsla(0,100%,50%,1)',
    object: { r: 255, g: 0, b: 0 },
  },
  lightRed: {
    hex: '#ff8080',
    hexAlpha: '#ff8080ff',
    rgb: 'rgb(255, 128, 128)',
    rgbNoSpace: 'rgb(255,128,128)',
    rgba: 'rgba(255, 128, 128, 1)',
    rgbaNoSpace: 'rgba(255,128,128,1)',
    hsl: 'hsl(0, 100%, 75%)',
    hslNoSpace: 'hsl(0,100%,75%)',
    hsla: 'hsla(0, 100%, 75%, 1)',
    hslaNoSpace: 'hsla(0,100%,75%,1)',
    object: { r: 255, g: 128, b: 128 },
  },
  darkRed: {
    hex: '#800000',
    hexAlpha: '#800000ff',
    hexShort: '#800',
    rgb: 'rgb(128, 0, 0)',
    rgbNoSpace: 'rgb(128,0,0)',
    rgba: 'rgba(128, 0, 0, 1)',
    rgbaNoSpace: 'rgba(128,0,0,1)',
    hsl: 'hsl(0, 100%, 25%)',
    hslNoSpace: 'hsl(0,100%,25%)',
    hsla: 'hsla(0, 100%, 25%, 1)',
    hslaNoSpace: 'hsla(0,100%,25%,1)',
    object: { r: 128, g: 0, b: 0 },
  },
  semiRed: {
    hex: undefined,
    hexAlpha: '#ff000080',
    hexShort: undefined,
    rgb: undefined,
    rgbNoSpace: undefined,
    rgba: 'rgba(255, 0, 0, 0.5)',
    rgbaNoSpace: 'rgba(255,0,0,0.5)',
    hsl: undefined,
    hslNoSpace: undefined,
    hsla: 'hsla(0, 100%, 50%, 0.5)',
    hslaNoSpace: 'hsla(0,100%,50%,0.5)',
    object: { r: 255, g: 0, b: 0, a: 0.5 },
  },
  orange: {
    hex: '#ff8000',
    hexAlpha: '#ff8000ff',
    hexShort: undefined,
    rgb: 'rgb(255, 128, 0)',
    rgbNoSpace: 'rgb(255,128,0)',
    rgba: 'rgba(255, 128, 0, 1)',
    rgbaNoSpace: 'rgba(255,128,0,1)',
    hsl: 'hsl(30, 100%, 50%)',
    hslNoSpace: 'hsl(30,100%,50%)',
    hsla: 'hsla(30, 100%, 50%)',
    hslaNoSpace: 'hsla(30,100%,50%)',
    object: { r: 255, g: 128, b: 0 },
  },
  yellow: {
    hex: '#ffff00',
    hexAlpha: '#ffff00ff',
    hexShort: '#ff0',
    rgb: 'rgb(255, 255, 0)',
    rgbNoSpace: 'rgb(255,255,0)',
    rgba: 'rgba(255, 255, 0, 1)',
    rgbaNoSpace: 'rgba(255,255,0,1)',
    hsl: 'hsl(60, 100%, 50%)',
    hslNoSpace: 'hsl(60,100%,50%)',
    hsla: 'hsla(60, 100%, 50%)',
    hslaNoSpace: 'hsla(60,100%,50%)',
    object: { r: 255, g: 255, b: 0 },
  },
  lime: {
    hex: '#80ff00',
    hexAlpha: '#80ff00ff',
    hexShort: undefined,
    rgb: 'rgb(128, 255, 0)',
    rgbNoSpace: 'rgb(128,255,0)',
    rgba: 'rgba(128, 255, 0, 1)',
    rgbaNoSpace: 'rgba(128,255,0,1)',
    hsl: 'hsl(90, 100%, 50%)',
    hslNoSpace: 'hsl(90,100%,50%)',
    hsla: 'hsla(90, 100%, 50%)',
    hslaNoSpace: 'hsla(90,100%,50%)',
    object: { r: 128, g: 255, b: 0 },
  },
  green: {
    hex: '#00ff00',
    hexAlpha: '#00ff00ff',
    hexShort: '#0f0',
    rgb: 'rgb(0, 255, 0)',
    rgbNoSpace: 'rgb(0,255,0)',
    rgba: 'rgba(0, 255, 0, 1)',
    rgbaNoSpace: 'rgba(0,255,0,1)',
    hsl: 'hsl(120, 100%, 50%)',
    hslNoSpace: 'hsl(120,100%,50%)',
    hsla: 'hsla(120, 100%, 50%)',
    hslaNoSpace: 'hsla(120,100%,50%)',
    object: { r: 0, g: 255, b: 0 },
  },
  teal: {
    hex: '#00ff80',
    hexAlpha: '#00ff80ff',
    hexShort: undefined,
    rgb: 'rgb(0, 255, 128)',
    rgbNoSpace: 'rgb(0,255,128)',
    rgba: 'rgba(0, 255, 128, 1)',
    rgbaNoSpace: 'rgba(0,255,128,1)',
    hsl: 'hsl(150, 100%, 50%)',
    hslNoSpace: 'hsl(150,100%,50%)',
    hsla: 'hsla(150, 100%, 50%)',
    hslaNoSpace: 'hsla(150,100%,50%)',
    object: { r: 0, g: 255, b: 128 },
  },
  cyan: {
    hex: '#00ffff',
    hexAlpha: '#00ffffff',
    hexShort: '#0ff',
    rgb: 'rgb(0, 255, 255)',
    rgbNoSpace: 'rgb(0,255,255)',
    rgba: 'rgba(0, 255, 255, 1)',
    rgbaNoSpace: 'rgba(0,255,255,1)',
    hsl: 'hsl(180, 100%, 50%)',
    hslNoSpace: 'hsl(180,100%,50%)',
    hsla: 'hsla(180, 100%, 50%)',
    hslaNoSpace: 'hsla(180,100%,50%)',
    object: { r: 0, g: 255, b: 255 },
  },
  lightblue: {
    hex: '#0080ff',
    hexAlpha: '#0080ffff',
    hexShort: undefined,
    rgb: 'rgb(0, 128, 255)',
    rgbNoSpace: 'rgb(0,128,255)',
    rgba: 'rgba(0, 128, 255, 1)',
    rgbaNoSpace: 'rgba(0,128,255,1)',
    hsl: 'hsl(210, 100%, 50%)',
    hslNoSpace: 'hsl(210,100%,50%)',
    hsla: 'hsla(210, 100%, 50%)',
    hslaNoSpace: 'hsla(210,100%,50%)',
    object: { r: 0, g: 128, b: 255 },
  },
  blue: {
    hex: '#0000ff',
    hexAlpha: '#0000ffff',
    hexShort: '#00f',
    rgb: 'rgb(0, 0, 255)',
    rgbNoSpace: 'rgb(0,0,255)',
    rgba: 'rgba(0, 0, 255, 1)',
    rgbaNoSpace: 'rgba(0,0,255,1)',
    hsl: 'hsl(240, 100%, 50%)',
    hslNoSpace: 'hsl(240,100%,50%)',
    hsla: 'hsla(240, 100%, 50%)',
    hslaNoSpace: 'hsla(240,100%,50%)',
    object: { r: 0, g: 0, b: 255 },
  },
  purple: {
    hex: '#8000ff',
    hexAlpha: '#8000ffff',
    hexShort: undefined,
    rgb: 'rgb(128, 0, 255)',
    rgbNoSpace: 'rgb(128,0,255)',
    rgba: 'rgba(128, 0, 255, 1)',
    rgbaNoSpace: 'rgba(128,0,255,1)',
    hsl: 'hsl(270, 100%, 50%)',
    hslNoSpace: 'hsl(270,100%,50%)',
    hsla: 'hsla(270, 100%, 50%)',
    hslaNoSpace: 'hsla(270,100%,50%)',
    object: { r: 128, g: 0, b: 255 },
  },
  pink: {
    hex: '#ff00ff',
    hexAlpha: '#ff00ffff',
    hexShort: '#f0f',
    rgb: 'rgb(255, 0, 255)',
    rgbNoSpace: 'rgb(255,0,255)',
    rgba: 'rgba(255, 0, 255, 1)',
    rgbaNoSpace: 'rgba(255,0,255,1)',
    hsl: 'hsl(300, 100%, 50%)',
    hslNoSpace: 'hsl(300,100%,50%)',
    hsla: 'hsla(300, 100%, 50%)',
    hslaNoSpace: 'hsla(300,100%,50%)',
    object: { r: 255, g: 0, b: 255 },
  },
  magenta: {
    hex: '#ff0080',
    hexAlpha: '#ff0080ff',
    hexShort: undefined,
    rgb: 'rgb(255, 0, 128)',
    rgbNoSpace: 'rgb(255,0,128)',
    rgba: 'rgba(255, 0, 128, 1)',
    rgbaNoSpace: 'rgba(255,0,128,1)',
    hsl: 'hsl(330, 100%, 50%)',
    hslNoSpace: 'hsl(330,100%,50%)',
    hsla: 'hsla(330, 100%, 50%)',
    hslaNoSpace: 'hsla(330,100%,50%)',
    object: { r: 255, g: 0, b: 128 },
  },
};

describe('alpha()', () => {
  it.each`
    input               | a
    ${'potato'}         | ${0}
    ${''}               | ${0}
    ${null}             | ${0}
    ${colors.white.hex} | ${'potato'}
    ${colors.white.hex} | ${''}
    ${colors.white.hex} | ${null}
  `('should throw given $input, $a', ({ input, a }) => {
    expect(() => alpha(input, a)).toThrow();
  });

  it.each`
    input                       | a      | expectedResult
    ${colors.white.hex}         | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hexAlpha}    | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hexShort}    | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgb}         | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgbNoSpace}  | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgba}        | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.rgbaNoSpace} | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hsl}         | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hslNoSpace}  | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hsla}        | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.white.hslaNoSpace} | ${0.5} | ${colors.semiWhite.rgba}
    ${colors.red.hex}           | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hexAlpha}      | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hexShort}      | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgb}           | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgbNoSpace}    | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgba}          | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.rgbaNoSpace}   | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hsl}           | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hslNoSpace}    | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hsla}          | ${0.5} | ${colors.semiRed.rgba}
    ${colors.red.hslaNoSpace}   | ${0.5} | ${colors.semiRed.rgba}
  `('returns $expectedResult given $input, $a', ({ input, a, expectedResult }) => {
    const result = alpha(input, a);

    expect(result).toEqual(expectedResult);
  });
});

describe('mix()', () => {
  it.each`
    color1              | color2              | ratio
    ${'potato'}         | ${'potato'}         | ${0.5}
    ${''}               | ${''}               | ${0.5}
    ${null}             | ${null}             | ${0.5}
    ${colors.white.hex} | ${'potato'}         | ${0.5}
    ${colors.white.hex} | ${''}               | ${0.5}
    ${colors.white.hex} | ${null}             | ${0.5}
    ${'potato'}         | ${colors.white.hex} | ${0.5}
    ${''}               | ${colors.white.hex} | ${0.5}
    ${null}             | ${colors.white.hex} | ${0.5}
    ${colors.white.hex} | ${colors.black.hex} | ${'potato'}
  `('should throw given $color1, $color2, $ratio', ({ color1, color2, ratio }) => {
    expect(() => mix(color1, color2, ratio)).toThrow();
  });

  it.each`
    color1                      | color2              | ratio   | expectedResult
    ${colors.white.hex}         | ${colors.black.hex} | ${''}   | ${colors.gray.hex}
    ${colors.white.hex}         | ${colors.black.hex} | ${null} | ${colors.gray.hex}
    ${colors.white.hex}         | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexAlpha}    | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexShort}    | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgb}         | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbNoSpace}  | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgba}        | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbaNoSpace} | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsl}         | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslNoSpace}  | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsla}        | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslaNoSpace} | ${colors.black.hex} | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexAlpha}      | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexShort}      | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgb}           | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbNoSpace}    | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgba}          | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbaNoSpace}   | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsl}           | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslNoSpace}    | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsla}          | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslaNoSpace}   | ${colors.black.hex} | ${0.5}  | ${colors.darkRed.hex}
  `(
    'returns $expectedResult given $color1, $color2, $ratio',
    ({ color1, color2, ratio, expectedResult }) => {
      const result = mix(color1, color2, ratio);

      expect(result).toEqual(expectedResult);
    },
  );
});

describe('mixBlack()', () => {
  it.each`
    input               | ratio
    ${'potato'}         | ${0}
    ${''}               | ${0}
    ${null}             | ${0}
    ${colors.white.hex} | ${'potato'}
  `('should throw given $input, $ratio', ({ input, ratio }) => {
    expect(() => mixBlack(input, ratio)).toThrow();
  });

  it.each`
    input                       | ratio   | expectedResult
    ${colors.white.hex}         | ${''}   | ${colors.gray.hex}
    ${colors.white.hex}         | ${null} | ${colors.gray.hex}
    ${colors.white.hex}         | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexAlpha}    | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hexShort}    | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgb}         | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgba}        | ${0.5}  | ${colors.gray.hex}
    ${colors.white.rgbaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsl}         | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hsla}        | ${0.5}  | ${colors.gray.hex}
    ${colors.white.hslaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexAlpha}      | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hexShort}      | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgb}           | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbNoSpace}    | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgba}          | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.rgbaNoSpace}   | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsl}           | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslNoSpace}    | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hsla}          | ${0.5}  | ${colors.darkRed.hex}
    ${colors.red.hslaNoSpace}   | ${0.5}  | ${colors.darkRed.hex}
  `('returns $expectedResult given $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixBlack(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});

describe('mixWhite()', () => {
  it.each`
    input               | ratio
    ${'potato'}         | ${0}
    ${''}               | ${0}
    ${null}             | ${0}
    ${colors.black.hex} | ${'potato'}
  `('should throw given $input, $ratio', ({ input, ratio }) => {
    expect(() => mixWhite(input, ratio)).toThrow();
  });

  it.each`
    input                       | ratio   | expectedResult
    ${colors.black.hex}         | ${''}   | ${colors.gray.hex}
    ${colors.black.hex}         | ${null} | ${colors.gray.hex}
    ${colors.black.hex}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hexAlpha}    | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hexShort}    | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgb}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgba}        | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hsl}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hsla}        | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hexAlpha}      | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hexShort}      | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgb}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbNoSpace}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgba}          | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbaNoSpace}   | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hsl}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslNoSpace}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hsla}          | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslaNoSpace}   | ${0.5}  | ${colors.lightRed.hex}
  `('returns $expectedResult given $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixWhite(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});

describe('toHex()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toHex(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.hex}
    ${colors.white.hexAlpha}      | ${colors.white.hex}
    ${colors.white.hexShort}      | ${colors.white.hex}
    ${colors.white.rgb}           | ${colors.white.hex}
    ${colors.white.rgbNoSpace}    | ${colors.white.hex}
    ${colors.white.rgba}          | ${colors.white.hex}
    ${colors.white.rgbaNoSpace}   | ${colors.white.hex}
    ${colors.white.hsl}           | ${colors.white.hex}
    ${colors.white.hslNoSpace}    | ${colors.white.hex}
    ${colors.white.hsla}          | ${colors.white.hex}
    ${colors.white.hslaNoSpace}   | ${colors.white.hex}
    ${colors.red.hex}             | ${colors.red.hex}
    ${colors.red.hexAlpha}        | ${colors.red.hex}
    ${colors.red.hexShort}        | ${colors.red.hex}
    ${colors.red.rgb}             | ${colors.red.hex}
    ${colors.red.rgbNoSpace}      | ${colors.red.hex}
    ${colors.red.rgba}            | ${colors.red.hex}
    ${colors.red.rgbaNoSpace}     | ${colors.red.hex}
    ${colors.red.hsl}             | ${colors.red.hex}
    ${colors.red.hslNoSpace}      | ${colors.red.hex}
    ${colors.red.hsla}            | ${colors.red.hex}
    ${colors.red.hslaNoSpace}     | ${colors.red.hex}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.rgba}        | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.hsla}        | ${colors.semiRed.hexAlpha}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.hexAlpha}
    ${colors.orange.hsl}          | ${colors.orange.hex}
    ${colors.yellow.hsl}          | ${colors.yellow.hex}
    ${colors.lime.hsl}            | ${colors.lime.hex}
    ${colors.green.hsl}           | ${colors.green.hex}
    ${colors.teal.hsl}            | ${colors.teal.hex}
    ${colors.cyan.hsl}            | ${colors.cyan.hex}
    ${colors.lightblue.hsl}       | ${colors.lightblue.hex}
    ${colors.blue.hsl}            | ${colors.blue.hex}
    ${colors.purple.hsl}          | ${colors.purple.hex}
    ${colors.pink.hsl}            | ${colors.pink.hex}
    ${colors.magenta.hsl}         | ${colors.magenta.hex}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toHex(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('toHsl()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toHsl(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.hsl}
    ${colors.white.hexAlpha}      | ${colors.white.hsl}
    ${colors.white.hexShort}      | ${colors.white.hsl}
    ${colors.white.rgb}           | ${colors.white.hsl}
    ${colors.white.rgbNoSpace}    | ${colors.white.hsl}
    ${colors.white.rgba}          | ${colors.white.hsl}
    ${colors.white.rgbaNoSpace}   | ${colors.white.hsl}
    ${colors.white.hsl}           | ${colors.white.hsl}
    ${colors.white.hslNoSpace}    | ${colors.white.hsl}
    ${colors.white.hsla}          | ${colors.white.hsl}
    ${colors.white.hslaNoSpace}   | ${colors.white.hsl}
    ${colors.red.hex}             | ${colors.red.hsl}
    ${colors.red.hexAlpha}        | ${colors.red.hsl}
    ${colors.red.hexShort}        | ${colors.red.hsl}
    ${colors.red.rgb}             | ${colors.red.hsl}
    ${colors.red.rgbNoSpace}      | ${colors.red.hsl}
    ${colors.red.rgba}            | ${colors.red.hsl}
    ${colors.red.rgbaNoSpace}     | ${colors.red.hsl}
    ${colors.red.hsl}             | ${colors.red.hsl}
    ${colors.red.hslNoSpace}      | ${colors.red.hsl}
    ${colors.red.hsla}            | ${colors.red.hsl}
    ${colors.red.hslaNoSpace}     | ${colors.red.hsl}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.hsla}
    ${colors.semiRed.rgba}        | ${colors.semiRed.hsla}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.hsla}
    ${colors.semiRed.hsla}        | ${colors.semiRed.hsla}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.hsla}
    ${colors.orange.hex}          | ${colors.orange.hsl}
    ${colors.yellow.hex}          | ${colors.yellow.hsl}
    ${colors.lime.hex}            | ${colors.lime.hsl}
    ${colors.green.hex}           | ${colors.green.hsl}
    ${colors.teal.hex}            | ${colors.teal.hsl}
    ${colors.cyan.hex}            | ${colors.cyan.hsl}
    ${colors.lightblue.hex}       | ${colors.lightblue.hsl}
    ${colors.blue.hex}            | ${colors.blue.hsl}
    ${colors.purple.hex}          | ${colors.purple.hsl}
    ${colors.pink.hex}            | ${colors.pink.hsl}
    ${colors.magenta.hex}         | ${colors.magenta.hsl}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toHsl(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('toObject()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toObject(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.object}
    ${colors.white.hexAlpha}      | ${colors.white.object}
    ${colors.white.hexShort}      | ${colors.white.object}
    ${colors.white.rgb}           | ${colors.white.object}
    ${colors.white.rgbNoSpace}    | ${colors.white.object}
    ${colors.white.rgba}          | ${colors.white.object}
    ${colors.white.rgbaNoSpace}   | ${colors.white.object}
    ${colors.white.hsl}           | ${colors.white.object}
    ${colors.white.hslNoSpace}    | ${colors.white.object}
    ${colors.white.hsla}          | ${colors.white.object}
    ${colors.white.hslaNoSpace}   | ${colors.white.object}
    ${colors.red.hex}             | ${colors.red.object}
    ${colors.red.hexAlpha}        | ${colors.red.object}
    ${colors.red.hexShort}        | ${colors.red.object}
    ${colors.red.rgb}             | ${colors.red.object}
    ${colors.red.rgbNoSpace}      | ${colors.red.object}
    ${colors.red.rgba}            | ${colors.red.object}
    ${colors.red.rgbaNoSpace}     | ${colors.red.object}
    ${colors.red.hsl}             | ${colors.red.object}
    ${colors.red.hslNoSpace}      | ${colors.red.object}
    ${colors.red.hsla}            | ${colors.red.object}
    ${colors.red.hslaNoSpace}     | ${colors.red.object}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.object}
    ${colors.semiRed.rgba}        | ${colors.semiRed.object}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.object}
    ${colors.semiRed.hsla}        | ${colors.semiRed.object}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.object}
    ${colors.orange.hsl}          | ${colors.orange.object}
    ${colors.yellow.hsl}          | ${colors.yellow.object}
    ${colors.lime.hsl}            | ${colors.lime.object}
    ${colors.green.hsl}           | ${colors.green.object}
    ${colors.teal.hsl}            | ${colors.teal.object}
    ${colors.cyan.hsl}            | ${colors.cyan.object}
    ${colors.lightblue.hsl}       | ${colors.lightblue.object}
    ${colors.blue.hsl}            | ${colors.blue.object}
    ${colors.purple.hsl}          | ${colors.purple.object}
    ${colors.pink.hsl}            | ${colors.pink.object}
    ${colors.magenta.hsl}         | ${colors.magenta.object}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toObject(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('toRgb()', () => {
  it.each`
    input
    ${null}
    ${'potato'}
    ${''}
  `('should throw given $input', ({ input }) => {
    expect(() => toRgb(input)).toThrow();
  });

  it.each`
    input                         | expectedResult
    ${colors.white.hex}           | ${colors.white.rgb}
    ${colors.white.hexAlpha}      | ${colors.white.rgb}
    ${colors.white.hexShort}      | ${colors.white.rgb}
    ${colors.white.rgb}           | ${colors.white.rgb}
    ${colors.white.rgbNoSpace}    | ${colors.white.rgb}
    ${colors.white.rgba}          | ${colors.white.rgb}
    ${colors.white.rgbaNoSpace}   | ${colors.white.rgb}
    ${colors.white.hsl}           | ${colors.white.rgb}
    ${colors.white.hslNoSpace}    | ${colors.white.rgb}
    ${colors.white.hsla}          | ${colors.white.rgb}
    ${colors.white.hslaNoSpace}   | ${colors.white.rgb}
    ${colors.red.hex}             | ${colors.red.rgb}
    ${colors.red.hexAlpha}        | ${colors.red.rgb}
    ${colors.red.hexShort}        | ${colors.red.rgb}
    ${colors.red.rgb}             | ${colors.red.rgb}
    ${colors.red.rgbNoSpace}      | ${colors.red.rgb}
    ${colors.red.rgba}            | ${colors.red.rgb}
    ${colors.red.rgbaNoSpace}     | ${colors.red.rgb}
    ${colors.red.hsl}             | ${colors.red.rgb}
    ${colors.red.hslNoSpace}      | ${colors.red.rgb}
    ${colors.red.hsla}            | ${colors.red.rgb}
    ${colors.red.hslaNoSpace}     | ${colors.red.rgb}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.rgba}
    ${colors.semiRed.rgba}        | ${colors.semiRed.rgba}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.rgba}
    ${colors.semiRed.hsla}        | ${colors.semiRed.rgba}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.rgba}
    ${colors.orange.hsl}          | ${colors.orange.rgb}
    ${colors.yellow.hsl}          | ${colors.yellow.rgb}
    ${colors.lime.hsl}            | ${colors.lime.rgb}
    ${colors.green.hsl}           | ${colors.green.rgb}
    ${colors.teal.hsl}            | ${colors.teal.rgb}
    ${colors.cyan.hsl}            | ${colors.cyan.rgb}
    ${colors.lightblue.hsl}       | ${colors.lightblue.rgb}
    ${colors.blue.hsl}            | ${colors.blue.rgb}
    ${colors.purple.hsl}          | ${colors.purple.rgb}
    ${colors.pink.hsl}            | ${colors.pink.rgb}
    ${colors.magenta.hsl}         | ${colors.magenta.rgb}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toRgb(input);

    expect(result).toEqual(expectedResult);
  });
});
