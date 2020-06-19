import { newE2EPage } from '@stencil/core/testing';

describe('rbo-base-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-base-input></rbo-base-input>');

    const element = await page.find('rbo-base-input');
    expect(element).toHaveClass('hydrated');
  });
});
