import { newE2EPage } from '@stencil/core/testing';

describe('spinner-loading', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spinner-loading></spinner-loading>');

    const element = await page.find('spinner-loading');
    expect(element).toHaveClass('hydrated');
  });
});
