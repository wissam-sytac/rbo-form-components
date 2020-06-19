import { newSpecPage } from '@stencil/core/testing';
import { RboBaseInput } from './rbo-base-input';

describe('rbo-base-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RboBaseInput],
      html: `<rbo-base-input></rbo-base-input>`,
    });
    expect(page.root).toEqualHtml(`
      <rbo-base-input>
        <mock:shadow-root>
          <div>
            <label></label>
            <div class="input">
              <input type="text" value=""/>
            </div>
          </div>
        </mock:shadow-root>
      </rbo-base-input>
    `);
  });
});
