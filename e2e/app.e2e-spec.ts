import { BrainsharkMLPage } from './app.po';

describe('brainshark-ml App', function() {
  let page: BrainsharkMLPage;

  beforeEach(() => {
    page = new BrainsharkMLPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
