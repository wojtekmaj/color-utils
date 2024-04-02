import { describe, expect, it } from 'vitest';
import toObject from './toObject.js';

import { colors } from '../test_data.js';

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
    ${colors.white.rgbModern}     | ${colors.white.object}
    ${colors.white.rgba}          | ${colors.white.object}
    ${colors.white.rgbaNoSpace}   | ${colors.white.object}
    ${colors.white.rgbaModern}    | ${colors.white.object}
    ${colors.white.hsl}           | ${colors.white.object}
    ${colors.white.hslNoSpace}    | ${colors.white.object}
    ${colors.white.hslModern}     | ${colors.white.object}
    ${colors.white.hsla}          | ${colors.white.object}
    ${colors.white.hslaNoSpace}   | ${colors.white.object}
    ${colors.white.hslaModern}    | ${colors.white.object}
    ${colors.red.hex}             | ${colors.red.object}
    ${colors.red.hexAlpha}        | ${colors.red.object}
    ${colors.red.hexShort}        | ${colors.red.object}
    ${colors.red.rgb}             | ${colors.red.object}
    ${colors.red.rgbNoSpace}      | ${colors.red.object}
    ${colors.red.rgbModern}       | ${colors.red.object}
    ${colors.red.rgba}            | ${colors.red.object}
    ${colors.red.rgbaNoSpace}     | ${colors.red.object}
    ${colors.red.rgbaModern}      | ${colors.red.object}
    ${colors.red.hsl}             | ${colors.red.object}
    ${colors.red.hslNoSpace}      | ${colors.red.object}
    ${colors.red.hslModern}       | ${colors.red.object}
    ${colors.red.hsla}            | ${colors.red.object}
    ${colors.red.hslaNoSpace}     | ${colors.red.object}
    ${colors.red.hslaModern}      | ${colors.red.object}
    ${colors.semiRed.hexAlpha}    | ${colors.semiRed.object}
    ${colors.semiRed.rgba}        | ${colors.semiRed.object}
    ${colors.semiRed.rgbaNoSpace} | ${colors.semiRed.object}
    ${colors.semiRed.rgbaModern}  | ${colors.semiRed.object}
    ${colors.semiRed.hsla}        | ${colors.semiRed.object}
    ${colors.semiRed.hslaNoSpace} | ${colors.semiRed.object}
    ${colors.semiRed.hslaModern}  | ${colors.semiRed.object}
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
