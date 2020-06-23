import { newE2EPage } from '@stencil/core/testing';

describe('rbo-input-control', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-input-control></rbo-input-control>');

    const el = await page.find('rbo-input-control');
    expect(el).not.toBeNull();
  });
});
