import { newSpecPage } from '@stencil/core/testing';
import { RboForm } from './rbo-form';

describe('rbo-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RboForm],
      html: `<rbo-form></rbo-form>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-form>
        <mock:shadow-root>
          <form>
            <slot></slot>
            <div class="action-wrap">
              <button>Submit</button>
            </div>
          </form>
        </mock:shadow-root>
      </rbo-form>
    `);
  });
});
