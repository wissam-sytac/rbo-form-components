import { newSpecPage } from '@stencil/core/testing';
import { RboButton } from './rbo-button';

describe('rbo-button', () => {
  it('renders primary button with text', async () => {
    const page = await newSpecPage({
      components: [RboButton],
      html: `<rbo-button text="do it now!"></rbo-button>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-button class="primary" text="do it now!">
        <mock:shadow-root>
          <button>do it now!</button>
        </mock:shadow-root>
      </rbo-button>
    `);
  });

  it('renders disabled', async () => {
    const page = await newSpecPage({
      components: [RboButton],
      html: `<rbo-button disabled="true" text="do it now!"></rbo-button>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-button disabled="true" class="disabled" text="do it now!">
        <mock:shadow-root>
          <button disabled>do it now!</button>
        </mock:shadow-root>
      </rbo-button>
    `);
  });
});
