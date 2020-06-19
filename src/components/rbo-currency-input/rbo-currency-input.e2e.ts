import { newE2EPage } from '@stencil/core/testing';

describe('rbo-currency-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-currency-input></rbo-currency-input>');

    const element = await page.find('rbo-currency-input');
    expect(element).toHaveClass('hydrated');
  });
});
