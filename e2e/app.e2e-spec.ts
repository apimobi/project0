import { Project0Page } from './app.po';

describe('project-0 App', function() {
  let page: Project0Page;

  beforeEach(() => {
    page = new Project0Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
