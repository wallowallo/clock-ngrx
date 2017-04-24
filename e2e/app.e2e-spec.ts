import { ClockNgrxPage } from './app.po';

describe('clock-ngrx App', () => {
  let page: ClockNgrxPage;

  beforeEach(() => {
    page = new ClockNgrxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
