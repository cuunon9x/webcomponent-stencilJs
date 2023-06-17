import { newSpecPage } from '@stencil/core/testing';
import { SpinnerLoading } from '../spinner-loading';

describe('spinner-loading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpinnerLoading],
      html: `<spinner-loading></spinner-loading>`,
    });
    expect(page.root).toEqualHtml(`
      <spinner-loading>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spinner-loading>
    `);
  });
});
