import { newSpecPage } from '@stencil/core/testing';
import { RboForm } from './rbo-form';
import {RboCurrencyInput} from '../rbo-currency-input/rbo-currency-input';

describe('rbo-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RboForm],
      html: `<rbo-form></rbo-form>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-form >
        <mock:shadow-root>
          <form>
            <slot></slot>
            <div class="action-wrap">
              <rbo-button disabled text="Submit"></rbo-button>
            </div>
          </form>
        </mock:shadow-root>
      </rbo-form>
    `);
  });

  it('renders with inputs', async () => {
    const page = await newSpecPage({
      components: [RboForm, RboCurrencyInput],
      html: `<rbo-form>
        <rbo-currency-input name="input-name"></rbo-currency-input>
      </rbo-form>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-form>
        <mock:shadow-root>
          <form>
            <slot></slot>
            <div class="action-wrap">
              <rbo-button text="Submit"></rbo-button>
            </div>
          </form>
        </mock:shadow-root>
        <rbo-currency-input name="input-name">
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
            <div class="input-decimals input-wrap">
              <input maxlength="2" placeholder="00" type="text" value="">
            </div>
          </mock:shadow-root>
        </rbo-currency-input>
      </rbo-form>
    `);
  });
});
