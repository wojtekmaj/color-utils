import { describe, expect, it } from 'vitest';

import { colors } from '../test_data.js';
import toRgb from './toRgb.js';

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
    ${colors.white.hex}           | ${colors.white.rgbModern}
    ${colors.white.hexAlpha}      | ${colors.white.rgbModern}
    ${colors.white.hexShort}      | ${colors.white.rgbModern}
    ${colors.white.rgb}           | ${colors.white.rgbModern}
    ${colors.white.rgbNoSpace}    | ${colors.white.rgbModern}
    ${colors.white.rgbModern}     | ${colors.white.rgbModern}
    ${colors.white.rgba}          | ${colors.white.rgbModern}
    ${colors.white.rgbaNoSpace}   | ${colors.white.rgbModern}
    ${colors.white.rgbaModern}    | ${colors.white.rgbModern}
    ${colors.white.hsl}           | ${colors.white.rgbModern}
    ${colors.white.hslNoSpace}    | ${colors.white.rgbModern}
    ${colors.white.hslModern}     | ${colors.white.rgbModern}
    ${colors.white.hsla}          | ${colors.white.rgbModern}
    ${colors.white.hslaNoSpace}   | ${colors.white.rgbModern}
    ${colors.white.hslaModern}    | ${colors.white.rgbModern}
    ${colors.red.hex}             | ${colors.red.rgbModern}
    ${colors.red.hexAlpha}        | ${colors.red.rgbModern}
    ${colors.red.hexShort}        | ${colors.red.rgbModern}
    ${colors.red.rgb}             | ${colors.red.rgbModern}
    ${colors.red.rgbNoSpace}      | ${colors.red.rgbModern}
    ${colors.red.rgbModern}       | ${colors.red.rgbModern}
    ${colors.red.rgba}            | ${colors.red.rgbModern}
    ${colors.red.rgbaNoSpace}     | ${colors.red.rgbModern}
    ${colors.red.rgbaModern}      | ${colors.red.rgbModern}
    ${colors.red.hsl}             | ${colors.red.rgbModern}
    ${colors.red.hslNoSpace}      | ${colors.red.rgbModern}
    ${colors.red.hslModern}       | ${colors.red.rgbModern}
    ${colors.red.hsla}            | ${colors.red.rgbModern}
    ${colors.red.hslaNoSpace}     | ${colors.red.rgbModern}
    ${colors.red.hslaModern}      | ${colors.red.rgbModern}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.rgbaModern}
    ${colors.semiRed.rgba}        | ${colors.semiRed.rgbaModern}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.rgbaModern}
    ${colors.semiRed.rgbaModern}  | ${colors.semiRed.rgbaModern}
    ${colors.semiRed.hsla}        | ${colors.semiRed.rgbaModern}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.rgbaModern}
    ${colors.semiRed.hslaModern}  | ${colors.semiRed.rgbaModern}
    ${colors.orange.hsl}          | ${colors.orange.rgbModern}
    ${colors.yellow.hsl}          | ${colors.yellow.rgbModern}
    ${colors.lime.hsl}            | ${colors.lime.rgbModern}
    ${colors.green.hsl}           | ${colors.green.rgbModern}
    ${colors.teal.hsl}            | ${colors.teal.rgbModern}
    ${colors.cyan.hsl}            | ${colors.cyan.rgbModern}
    ${colors.lightblue.hsl}       | ${colors.lightblue.rgbModern}
    ${colors.blue.hsl}            | ${colors.blue.rgbModern}
    ${colors.purple.hsl}          | ${colors.purple.rgbModern}
    ${colors.pink.hsl}            | ${colors.pink.rgbModern}
    ${colors.magenta.hsl}         | ${colors.magenta.rgbModern}
  `('returns $expectedResult given $input', ({ input, expectedResult }) => {
    const result = toRgb(input);

    expect(result).toEqual(expectedResult);
  });
});
