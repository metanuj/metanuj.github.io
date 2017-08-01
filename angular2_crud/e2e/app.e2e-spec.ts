import { TanujAssignmentPage } from './app.po';

describe('tanuj-assignment App', () => {
  let page: TanujAssignmentPage;

  beforeEach(() => {
    page = new TanujAssignmentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
