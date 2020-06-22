import { newE2EPage } from '@stencil/core/testing';

describe('rbo-currency-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-currency-input></rbo-currency-input>');

    const el = await page.find('rbo-currency-input');
    expect(el).not.toBeNull();
  });

  it('rejects non-numeric characters as the user types', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-currency-input></rbo-currency-input>');

    const wholeInputEl = await page.find('rbo-currency-input >>> .input-whole input');
    await wholeInputEl.press('1');
    await wholeInputEl.press('B');
    await wholeInputEl.press('$');
    await wholeInputEl.press('?');
    const wholeValue = await wholeInputEl.getProperty('value')
    expect(wholeValue).toBe('1');

    const decimalInputEl = await page.find('rbo-currency-input >>> .input-decimals input');
    await decimalInputEl.press('a');
    await decimalInputEl.press('B');
    await decimalInputEl.press('$');
    await decimalInputEl.press('?');
    await decimalInputEl.press('0');
    await decimalInputEl.press('3');
    let decimalValue = await decimalInputEl.getProperty('value');
    expect(decimalValue).toBe('03');
  });

  it('correctly formats integers as you type', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-currency-input></rbo-currency-input>');

    const wholeInputEl = await page.find('rbo-currency-input >>> .input-whole input');
    await wholeInputEl.press('1');
    await wholeInputEl.press('5');
    let wholeValue = await wholeInputEl.getProperty('value')
    expect(wholeValue).toBe('15');
  });

  it('suppresses leading zeros in whole number', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-currency-input></rbo-currency-input>');

    const wholeInputEl = await page.find('rbo-currency-input >>> .input-whole input');
    await wholeInputEl.press('0');
    await wholeInputEl.press('5');
    await wholeInputEl.press('8');
    let wholeValue = await wholeInputEl.getProperty('value')
    expect(wholeValue).toBe('58');
  });
});
