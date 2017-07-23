import { Loth.IoPage } from './app.po';

describe('loth.io App', () => {
  let page: Loth.IoPage;

  beforeEach(() => {
    page = new Loth.IoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to loth!');
  });
});
