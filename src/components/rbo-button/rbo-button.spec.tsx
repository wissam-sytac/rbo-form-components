import { newSpecPage } from '@stencil/core/testing';
import { RboButton } from './rbo-button';

describe('rbo-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RboButton],
      html: `<rbo-button></rbo-button>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </rbo-button>
    `);
  });
});
