import { newE2EPage } from '@stencil/core/testing';

describe('rbo-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-button></rbo-button>');

    const element = await page.find('rbo-button');
    expect(element).toHaveClass('hydrated');
  });
});
