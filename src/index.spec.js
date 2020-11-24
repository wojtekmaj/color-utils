import {
  alpha,
  mix,
  mixBlack,
  mixWhite,
  toHex,
  toObject,
  toRgb,
} from './index';

/* eslint-disable object-curly-newline */

describe('alpha()', () => {
  it.each`
    input               | a      | expectedResult
    ${null}             | ${0}   | ${null}
    ${'potato'}         | ${0}   | ${null}
    ${'#f00'}           | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'#ff0000'}        | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'#ff000000'}      | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'rgb(255, 0, 0)'} | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'rgb(255,0,0)'}   | ${0.5} | ${'rgba(255, 0, 0, 0.5)'}
    ${'rgb(0, 255, 0)'} | ${0.1} | ${'rgba(0, 255, 0, 0.1)'}
  `('returns $expectedResult for $input', ({ input, a, expectedResult }) => {
    const result = alpha(input, a);

    expect(result).toEqual(expectedResult);
  });
});

describe('mix()', () => {
  it.each`
    color1              | color2    | ratio   | expectedResult
    ${null}             | ${null}   | ${0.5}  | ${null}
    ${'#fff'}           | ${null}   | ${0.5}  | ${null}
    ${null}             | ${'#fff'} | ${0.5}  | ${null}
    ${'#f00'}           | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'#ff0000'}        | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'#5bc6e8'}        | ${'#000'} | ${0.16} | ${'#0f2025'}
    ${'rgb(255, 0, 0)'} | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'rgb(255,0,0)'}   | ${'#000'} | ${0.5}  | ${'#800000'}
    ${'rgb(0, 255, 0)'} | ${'#000'} | ${0.1}  | ${'#001a00'}
    ${'#f00'}           | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'#ff0000'}        | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'#5bc6e8'}        | ${'#fff'} | ${0.16} | ${'#e5f6fb'}
    ${'rgb(255, 0, 0)'} | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'rgb(255,0,0)'}   | ${'#fff'} | ${0.5}  | ${'#ff8080'}
    ${'rgb(0, 255, 0)'} | ${'#fff'} | ${0.1}  | ${'#e6ffe6'}
  `('returns $expectedResult for $color1, $color2, $ratio', ({ color1, color2, ratio, expectedResult }) => {
    const result = mix(color1, color2, ratio);

    expect(result).toEqual(expectedResult);
  });
});

describe('mixBlack()', () => {
  it.each`
    input               | ratio   | expectedResult
    ${null}             | ${0}    | ${null}
    ${'potato'}         | ${0}    | ${null}
    ${'#f00'}           | ${0.5}  | ${'#800000'}
    ${'#ff0000'}        | ${0.5}  | ${'#800000'}
    ${'#5bc6e8'}        | ${0.16} | ${'#0f2025'}
    ${'rgb(255, 0, 0)'} | ${0.5}  | ${'#800000'}
    ${'rgb(255,0,0)'}   | ${0.5}  | ${'#800000'}
    ${'rgb(0, 255, 0)'} | ${0.1}  | ${'#001a00'}
  `('returns $expectedResult for $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixBlack(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});

describe('mixWhite()', () => {
  it.each`
    input               | ratio   | expectedResult
    ${null}             | ${0}    | ${null}
    ${'potato'}         | ${0}    | ${null}
    ${'#f00'}           | ${0.5}  | ${'#ff8080'}
    ${'#ff0000'}        | ${0.5}  | ${'#ff8080'}
    ${'#5bc6e8'}        | ${0.16} | ${'#e5f6fb'}
    ${'rgb(255, 0, 0)'} | ${0.5}  | ${'#ff8080'}
    ${'rgb(255,0,0)'}   | ${0.5}  | ${'#ff8080'}
    ${'rgb(0, 255, 0)'} | ${0.1}  | ${'#e6ffe6'}
  `('returns $expectedResult for $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixWhite(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});

describe('toHex()', () => {
  it.each`
  input                      | expectedResult
  ${null}                   | ${null}
  ${'potato'}               | ${null}
  ${'#f00'}                 | ${'#ff0000'}
  ${'#ff0000'}              | ${'#ff0000'}
  ${'#ff000000'}            | ${'#ff000000'}
  ${'#ff00001a'}            | ${'#ff00001a'}
  ${'#ff0000ff'}            | ${'#ff0000ff'}
  ${'rgb(255,0,0)'}         | ${'#ff0000'}
  ${'rgb(255, 0, 0)'}       | ${'#ff0000'}
  ${'rgba(255,0,0,0)'}      | ${'#ff000000'}
  ${'rgba(255, 0, 0, 0)'}   | ${'#ff000000'}
  ${'rgba(255,0,0,.1)'}     | ${'#ff00001a'}
  ${'rgba(255, 0, 0, 0.1)'} | ${'#ff00001a'}
  ${'rgba(255, 0, 0, 1)'}   | ${'#ff0000ff'}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = toHex(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('toObject()', () => {
  it.each`
    input                      | expectedResult
     ${null}                   | ${null}
     ${'potato'}               | ${null}
     ${'#f00'}                 | ${{ r: 255, g: 0, b: 0 }}
     ${'#ff0000'}              | ${{ r: 255, g: 0, b: 0 }}
     ${'#ff000000'}            | ${{ r: 255, g: 0, b: 0, a: 0 }}
     ${'#ff00001a'}            | ${{ r: 255, g: 0, b: 0, a: 0.1 }}
     ${'#ff0000ff'}            | ${{ r: 255, g: 0, b: 0, a: 1 }}
     ${'rgb(255,0,0)'}         | ${{ r: 255, g: 0, b: 0 }}
     ${'rgb(255, 0, 0)'}       | ${{ r: 255, g: 0, b: 0 }}
     ${'rgba(255,0,0,0)'}      | ${{ r: 255, g: 0, b: 0, a: 0 }}
     ${'rgba(255, 0, 0, 0)'}   | ${{ r: 255, g: 0, b: 0, a: 0 }}
     ${'rgba(255,0,0,.1)'}     | ${{ r: 255, g: 0, b: 0, a: 0.1 }}
     ${'rgba(255, 0, 0, 0.1)'} | ${{ r: 255, g: 0, b: 0, a: 0.1 }}
     ${'rgba(255, 0, 0, 1)'}   | ${{ r: 255, g: 0, b: 0, a: 1 }}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = toObject(input);

    expect(result).toEqual(expectedResult);
  });
});

describe('toRgb()', () => {
  it.each`
    input                     | expectedResult
    ${null}                   | ${null}
    ${'potato'}               | ${null}
    ${'#f00'}                 | ${'rgb(255, 0, 0)'}
    ${'#ff0000'}              | ${'rgb(255, 0, 0)'}
    ${'#ff000000'}            | ${'rgba(255, 0, 0, 0)'}
    ${'#ff00001a'}            | ${'rgba(255, 0, 0, 0.1)'}
    ${'#ff0000ff'}            | ${'rgba(255, 0, 0, 1)'}
    ${'rgb(255,0,0)'}         | ${'rgb(255, 0, 0)'}
    ${'rgb(255, 0, 0)'}       | ${'rgb(255, 0, 0)'}
    ${'rgba(255,0,0,0)'}      | ${'rgba(255, 0, 0, 0)'}
    ${'rgba(255, 0, 0, 0)'}   | ${'rgba(255, 0, 0, 0)'}
    ${'rgba(255,0,0,.1)'}     | ${'rgba(255, 0, 0, 0.1)'}
    ${'rgba(255, 0, 0, 0.1)'} | ${'rgba(255, 0, 0, 0.1)'}
    ${'rgba(255, 0, 0, 1)'}   | ${'rgba(255, 0, 0, 1)'}
  `('returns $expectedResult for $input', ({ input, expectedResult }) => {
    const result = toRgb(input);

    expect(result).toEqual(expectedResult);
  });
});
