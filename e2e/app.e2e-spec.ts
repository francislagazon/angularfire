import { WebdevForumPage } from './app.po';

describe('webdev-forum App', () => {
  let page: WebdevForumPage;

  beforeEach(() => {
    page = new WebdevForumPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
