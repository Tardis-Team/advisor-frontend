import { AdvisorFrontendPage } from './app.po';

describe('advisor-frontend App', () => {
  let page: AdvisorFrontendPage;

  beforeEach(() => {
    page = new AdvisorFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
