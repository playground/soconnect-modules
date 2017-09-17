import { NgxLibraryTemplatePage } from './app.po';

describe('ngx-library-template App', () => {
  let page: NgxLibraryTemplatePage;

  beforeEach(() => {
    page = new NgxLibraryTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
