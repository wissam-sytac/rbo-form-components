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
          <span>
            EUR
          </span>
          <div class="input">
            <input placeholder="0" type="text" value="">
          </div>
          <span>
           .
          </span>
          <div class="input">
            <input maxlength="2" placeholder="00" type="text" value="">
          </div>
        </mock:shadow-root>
      </rbo-currency-input>
    `);
  });
});
