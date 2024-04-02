import { describe, expect, it } from 'vitest';
import mixWhite from './mixWhite.js';

import { colors } from '../test_data.js';

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
    ${colors.black.rgbModern}   | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgba}        | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.black.rgbaModern}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hsl}         | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslNoSpace}  | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslModern}   | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hsla}        | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslaNoSpace} | ${0.5}  | ${colors.gray.hex}
    ${colors.black.hslaModern}  | ${0.5}  | ${colors.gray.hex}
    ${colors.red.hex}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hexAlpha}      | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hexShort}      | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgb}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbNoSpace}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbModern}     | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgba}          | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbaNoSpace}   | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.rgbaModern}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hsl}           | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslNoSpace}    | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslModern}     | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hsla}          | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslaNoSpace}   | ${0.5}  | ${colors.lightRed.hex}
    ${colors.red.hslaModern}    | ${0.5}  | ${colors.lightRed.hex}
  `('returns $expectedResult given $input, $ratio', ({ input, ratio, expectedResult }) => {
    const result = mixWhite(input, ratio);

    expect(result).toEqual(expectedResult);
  });
});
