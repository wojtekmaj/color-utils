import { describe, expect, it } from 'vitest';
import { alpha, mix, mixBlack, mixWhite, toHex, toHsl, toLab, toObject, toRgb } from './index.js';

describe('index', () => {
  it('has alpha exported properly', () => {
    expect(alpha).toBeInstanceOf(Function);
  });

  it('has mix exported properly', () => {
    expect(mix).toBeInstanceOf(Function);
  });

  it('has mixBlack exported properly', () => {
    expect(mixBlack).toBeInstanceOf(Function);
  });

  it('has mixWhite exported properly', () => {
    expect(mixWhite).toBeInstanceOf(Function);
  });

  it('has toHex exported properly', () => {
    expect(toHex).toBeInstanceOf(Function);
  });

  it('has toHsl exported properly', () => {
    expect(toHsl).toBeInstanceOf(Function);
  });

  it('has toLab exported properly', () => {
    expect(toLab).toBeInstanceOf(Function);
  });

  it('has toObject exported properly', () => {
    expect(toObject).toBeInstanceOf(Function);
  });

  it('has toRgb exported properly', () => {
    expect(toRgb).toBeInstanceOf(Function);
  });
});
