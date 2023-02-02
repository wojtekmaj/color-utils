import mixBlack from './mixBlack';

import { colors } from '../test_data';

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
