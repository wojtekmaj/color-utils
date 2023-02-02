import toRgb from './toRgb';

import { colors } from '../test_data';

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
