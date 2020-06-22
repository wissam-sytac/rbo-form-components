import { newE2EPage } from '@stencil/core/testing';

describe('rbo-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-form></rbo-form>');

    const el = await page.find('rbo-form');
    expect(el).not.toBeNull();
  });

  it('renders disabled by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-form></rbo-form>');

    const buttonEl = await page.find('rbo-form >>> rbo-button');
    const buttonDisabledValue = await buttonEl.getProperty('disabled');
    expect(buttonDisabledValue).toEqual(true);
  });
});
