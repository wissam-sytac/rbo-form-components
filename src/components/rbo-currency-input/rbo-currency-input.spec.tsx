import { newSpecPage } from '@stencil/core/testing';
import { RboCurrencyInput } from './rbo-currency-input';

describe('rbo-currency-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RboCurrencyInput],
      html: `<rbo-currency-input></rbo-currency-input>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-currency-input>
        <mock:shadow-root>
          <span class="unit">
            €
          </span>
          <div class="input-whole input-wrap">
            <input maxlength="6" placeholder="0" type="text" value="">
          </div>
          <span class="decimal-dot">
           ,
          </span>
          <div class="input-wrap input-decimals">
            <input maxlength="2" placeholder="00" type="text" value="">
          </div>
        </mock:shadow-root>
      </rbo-currency-input>
    `);
  });

  it('renders as disabled', async () => {
    const page = await newSpecPage({
      components: [RboCurrencyInput],
      html: `<rbo-currency-input disabled="true"></rbo-currency-input>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-currency-input aria-disabled="true" class="disabled" disabled="true">
        <mock:shadow-root>
          <span class="unit">
            €
          </span>
          <div class="input-wrap input-whole">
            <input disabled maxlength="6" placeholder="0" type="text" value="">
          </div>
          <span class="decimal-dot">
           ,
          </span>
          <div class="input-wrap input-decimals">
            <input disabled maxlength="2" placeholder="00" type="text" value="">
          </div>
        </mock:shadow-root>
      </rbo-currency-input>
    `);
  });
});
