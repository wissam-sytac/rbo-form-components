import { newE2EPage } from '@stencil/core/testing';

describe('rbo-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-button></rbo-button>');

    const el = await page.find('rbo-button');
    expect(el).not.toBeNull();
  });

  it('should render primary button', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-button text="do it now!"></rbo-button>');

    const buttonEl = await page.find('rbo-button >>> button');
    expect(buttonEl).not.toBeNull();
    expect(buttonEl.textContent).toEqual('do it now!');
  });

  it('should render disabled button', async () => {
    const page = await newE2EPage();
    await page.setContent('<rbo-button text="do it now!" disabled="true"></rbo-button>');

    const buttonEl = await page.find('rbo-button >>> button:disabled');
    expect(buttonEl).not.toBeNull();
  });
});
