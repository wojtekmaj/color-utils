import {
  addAlpha,
  hexToRgbObject,
  hexToRgb,
  mixColors,
  mixBlack,
  mixWhite,
  rgbToRgbObject,
  rgbToHex,
} from './index';

/* eslint-disable object-curly-newline */

describe('addAlpha()', () => {
  it.each`
    input               | a      | expectedResult
    ${null}             | ${0}   | ${null}
    ${'potato'}         | ${0}   | ${null}
    ${'#ff0000'}        | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'#f00'}           | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'rgb(255, 0, 0)'} | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'rgb(255,0,0)'}   | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'rgb(0, 255, 0)'} | ${0.1} | ${'rgba(0, 255, 0, 0.1)'}
  `('returns $expectedResult for $input', ({ input, a, expectedResult }) => {
    const result = addAlpha(input, a);

    expect(result).toEqual(expectedResult);
  });
});

describe('hexToRgbObject()', () => {
  it.each`
    input          | expectedResult
    ${null}        | ${null}
    ${'potato'}    | ${null}
    ${'#ff0000'}   | ${{ r: 255, g: 0, b: 0 }}
    ${'#f00'}      | ${{ r: 255, g: 0, b: 0 }}
    ${'#ff000000'} | ${{ r: 255, g: 0, b: 0, a: 0 }}
    ${'#ff00001a'} | ${{ r: 255, g: 0, b: 0, a: 0.1 }}
    ${'#ff000080'} | ${{ r: 255, g: 0, b: 0, a: 0.5 }}
    ${'#ff0000e6'} | ${{ r: 255, g: 0, b: 0, a: 0.9 }}
    ${'#ff0000ff'} | ${{ r: 255, g: 0, b: 0, a: 1 }}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = hexToRgbObject(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('hexToRgb()', () => {
  it.each`
    input          | expectedResult
    ${null}        | ${null}
    ${'potato'}    | ${null}
    ${'#ff0000'}   | ${'rgb(255, 0, 0)'}
    ${'#f00'}      | ${'rgb(255, 0, 0)'}
    ${'#ff000000'} | ${'rgba(255, 0, 0, 0)'}
    ${'#ff00001a'} | ${'rgba(255, 0, 0, 0.1)'}
    ${'#ff000080'} | ${'rgba(255, 0, 0, 0.5)'}
    ${'#ff0000e6'} | ${'rgba(255, 0, 0, 0.9)'}
    ${'#ff0000ff'} | ${'rgba(255, 0, 0, 1)'}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = hexToRgb(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('mixColors()', () => {
  it.each`
    color1              | color2    | ratio   | expectedResult
    ${null}             | ${null}   | ${0.5}  | ${null}
    ${'#fff'}           | ${null}   | ${0.5}  | ${null}
    ${null}             | ${'#fff'} | ${0.5}  | ${null}
    ${'#ff0000'}        | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'#f00'}           | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'#5bc6e8'}        | ${'#000'} | ${0.16} | ${'#0f2025'}
    ${'rgb(255, 0, 0)'} | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'rgb(255,0,0)'}   | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'rgb(0, 255, 0)'} | ${'#000'} | ${0.1}  | ${'#001a00'}
    ${'#ff0000'}        | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'#f00'}           | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'#5bc6e8'}        | ${'#fff'} | ${0.16} | ${'#e5f6fb'}
    ${'rgb(255, 0, 0)'} | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'rgb(255,0,0)'}   | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'rgb(0, 255, 0)'} | ${'#fff'} | ${0.1}  | ${'#e6ffe6'}
  `('returns $expectedResult for $color1, $color2, $ratio', ({ color1, color2, ratio, expectedResult }) => {
    const result = mixColors(color1, color2, ratio);

    expect(result).toEqual(expectedResult);
  });
});

describe('mixBlack()', () => {
  it.each`
    input               | a       | expectedResult
    ${null}             | ${0}    | ${null}
    ${'potato'}         | ${0}    | ${null}
    ${'#ff0000'}        | ${0.5}  | ${'#800000'}
    ${'#f00'}           | ${0.5}  | ${'#800000'}
    ${'#5bc6e8'}        | ${0.16} | ${'#0f2025'}
    ${'rgb(255, 0, 0)'} | ${0.5}  | ${'#800000'}
    ${'rgb(255,0,0)'}   | ${0.5}  | ${'#800000'}
    ${'rgb(0, 255, 0)'} | ${0.1}  | ${'#001a00'}
  `('returns $expectedResult for $input', ({ input, a, expectedResult }) => {
    const result = mixBlack(input, a);

    expect(result).toEqual(expectedResult);
  });
});

describe('mixWhite()', () => {
  it.each`
    input               | a       | expectedResult
    ${null}             | ${0}    | ${null}
    ${'potato'}         | ${0}    | ${null}
    ${'#ff0000'}        | ${0.5}  | ${'#ff8080'}
    ${'#f00'}           | ${0.5}  | ${'#ff8080'}
    ${'#5bc6e8'}        | ${0.16} | ${'#e5f6fb'}
    ${'rgb(255, 0, 0)'} | ${0.5}  | ${'#ff8080'}
    ${'rgb(255,0,0)'}   | ${0.5}  | ${'#ff8080'}
    ${'rgb(0, 255, 0)'} | ${0.1}  | ${'#e6ffe6'}
  `('returns $expectedResult for $input', ({ input, a, expectedResult }) => {
    const result = mixWhite(input, a);

    expect(result).toEqual(expectedResult);
  });
});

describe('rgbToRgbObject()', () => {
  it.each`
    input                      | expectedResult
     ${null}                   | ${null}
     ${'potato'}               | ${null}
     ${'rgb(255, 0, 0)'}       | ${{ r: 255, g: 0, b: 0 }}
     ${'rgb(255,0,0)'}         | ${{ r: 255, g: 0, b: 0 }}
     ${'rgba(255, 0, 0, 0)'}   | ${{ r: 255, g: 0, b: 0, a: 0 }}
     ${'rgba(255,0,0,0)'}      | ${{ r: 255, g: 0, b: 0, a: 0 }}
     ${'rgba(255,0,0,.1)'}     | ${{ r: 255, g: 0, b: 0, a: 0.1 }}
     ${'rgba(255, 0, 0, 0.1)'} | ${{ r: 255, g: 0, b: 0, a: 0.1 }}
     ${'rgba(255, 0, 0, 0.5)'} | ${{ r: 255, g: 0, b: 0, a: 0.5 }}
     ${'rgba(255, 0, 0, 0.9)'} | ${{ r: 255, g: 0, b: 0, a: 0.9 }}
     ${'rgba(255, 0, 0, 1)'}   | ${{ r: 255, g: 0, b: 0, a: 1 }}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = rgbToRgbObject(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('rgbToHex()', () => {
  it.each`
    input                      | expectedResult
     ${null}                   | ${null}
     ${'potato'}               | ${null}
     ${'rgb(255, 0, 0)'}       | ${'#ff0000'}
     ${'rgb(255,0,0)'}         | ${'#ff0000'}
     ${'rgba(255, 0, 0, 0)'}   | ${'#ff000000'}
     ${'rgba(255,0,0,0)'}      | ${'#ff000000'}
     ${'rgba(255,0,0,.1)'}     | ${'#ff00001a'}
     ${'rgba(255, 0, 0, 0.1)'} | ${'#ff00001a'}
     ${'rgba(255, 0, 0, 0.5)'} | ${'#ff000080'}
     ${'rgba(255, 0, 0, 0.9)'} | ${'#ff0000e6'}
     ${'rgba(255, 0, 0, 1)'}   | ${'#ff0000ff'}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = rgbToHex(input);

    expect(result).toEqual(expectedResult);
  });
});
