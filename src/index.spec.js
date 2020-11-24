import {
  hexToRgbObject,
  hexToRgb,
  rgbToRgbObject,
  rgbToHex,
} from './index';

/* eslint-disable object-curly-newline */

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
