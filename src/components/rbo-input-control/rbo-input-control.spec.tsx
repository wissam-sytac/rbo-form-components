import { newSpecPage } from '@stencil/core/testing';
import { RboInputControl } from './rbo-input-control';

describe('rbo-input-control', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RboInputControl],
      html: `<rbo-input-control></rbo-input-control>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-input-control>
        <mock:shadow-root>
          <div class="input-control">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </rbo-input-control>
    `);
  });
});
