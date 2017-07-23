import { browser, by, element } from 'protractor';

export class Loth.IoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('loth-root h1')).getText();
  }
}
