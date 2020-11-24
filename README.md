[![npm](https://img.shields.io/npm/v/@wojtekmaj/color-utils.svg)](https://www.npmjs.com/package/@wojtekmaj/color-utils) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/color-utils.svg) [![CI](https://github.com/wojtekmaj/color-utils/workflows/CI/badge.svg)](https://github.com/wojtekmaj/color-utils/actions) ![dependencies](https://img.shields.io/david/wojtekmaj/color-utils.svg) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/color-utils.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# Color-Utils
A collection of color-related utilities.

## tl;dr
* Install by executing `npm install @wojtekmaj/color-utils` or `yarn add @wojtekmaj/color-utils`.
* Import by adding `import * as colorUtils from '@wojtekmaj/color-utils'`.
* Do stuff with it!
    ```js
    const redRgb = hexToRgb('#ff0000');
    ```

## User guide

### `addAlpha()`

Adds alpha channel to a given color.

#### Sample usage

```js
import { addAlpha } from '@wojtekmaj/color-utils';

addAlpha('#f00', 0.5); // "rgba(255, 0, 0, 0.5)"
addAlpha('#00ff00', 0.1); // "rgba(0, 255, 0, 0.1)"
hexToRgb('#0000ff80', 0.1); // "rgba(0, 0, 255, 0.1)"
rgbToRgbObject('rgb(255, 0, 0)', 0.5); // "rgba(255, 0, 0, 0.5)"
rgbToRgbObject('rgba(0, 0, 255, 0.5)', 0.1); // "rgba(0, 0, 255, 0.1)"
```

### `hexToRgbObject()`

Converts hex to an object with r, g, b, a? properties.

#### Sample usage

```js
import { hexToRgbObject } from '@wojtekmaj/color-utils';

hexToRgbObject('#f00'); // { r: 255, g: 0, b: 0 }
hexToRgbObject('#00ff00'); // { r: 0, g: 255, b: 0 }
hexToRgbObject('#0000ff80'); // { r: 0, g: 0, b: 255, a: 0.5 }
```

### `hexToRgb()`

Converts hex to rgb(…) or rgba(…), whichever is applicable.

#### Sample usage

```js
import { hexToRgb } from '@wojtekmaj/color-utils';

hexToRgb('#f00'); // "rgb(255, 0, 0)"
hexToRgb('#00ff00'); // "rgb(0, 255, 0)"
hexToRgb('#0000ff80'); // "rgba(0, 0, 255, 0.5)"
```

### `mixColors()`

Mixes colors together.

#### Sample usage

```js
import { mixColors } from '@wojtekmaj/color-utils';

mixColors('#ff0000', '#000', 0.5); // "#800000"
mixColors('rgb(255, 0, 0)', '#fff', 0.5); // "#ff8080"
```

### `mixBlack()`

Mixes color with black.

#### Sample usage

```js
import { mixBlack } from '@wojtekmaj/color-utils';

mixBlack('#ff0000', 0.5); // "#800000"
mixBlack('rgb(255, 0, 0)', 0.5); // "#800000"
```

### `mixWhite()`

Mixes color with white.

#### Sample usage

```js
import { mixWhite } from '@wojtekmaj/color-utils';

mixWhite('#ff0000', 0.5); // "#ff8080"
mixWhite('rgb(255, 0, 0)', 0.5); // "#ff8080"
```

### `rgbToRgbObject()`

Converts rgb(…) or rgba(…) to an object with r, g, b, a? properties.

#### Sample usage

```js
import { rgbToRgbObject } from '@wojtekmaj/color-utils';

rgbToRgbObject('rgb(255, 0, 0)'); // { r: 255, g: 0, b: 0 }
rgbToRgbObject('rgb(0, 255, 0)'); // { r: 0, g: 255, b: 0 }
rgbToRgbObject('rgba(0, 0, 255, 0.5)'); // { r: 0, g: 0, b: 255, a: 0.5 }
```

### `rgbToHex()`

Converts rgb(…) or rgba(…) to hex.

#### Sample usage

```js
import { rgbToHex } from '@wojtekmaj/color-utils';

rgbToHex('rgb(255, 0, 0)'); // "#ff0000"
rgbToHex('rgb(0, 255, 0)'); // "#00ff00"
rgbToHex('rgba(0, 0, 255, 0.5)'); // "#0000ff80"
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
