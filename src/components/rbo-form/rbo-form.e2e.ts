import { newE2EPage } from '@stencil/core/testing';

describe('rbo-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-form></rbo-form>');

    const element = await page.find('rbo-form');
    expect(element).toHaveClass('hydrated');
  });
});
