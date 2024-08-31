import path from 'node:path';
import process from 'node:process';
import os from 'node:os';

import selenium from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import * as nw from 'nw';

describe('nw.WIndow', { timeout: Infinity }, async function () {
  /**
   * @type {chrome.Driver}
  */
  let driver = undefined;

  /**
   * @type {string}
   */
  let chromedriverPath = undefined;

  beforeAll(async () => {
    const options = new chrome.Options();
    const args = [
      `--nwapp=${path.resolve('tests', 'fixtures', 'nw', 'window')}`,
      '--headless=new',
    ];
    options.addArguments(args);
    chromedriverPath = await nw.findpath('chromedriver', { flavor: 'sdk' });
    const service = new chrome.ServiceBuilder(chromedriverPath).build();
    driver = chrome.Driver.createSession(options, service);
  });

  it('nw.Window.isDevToolsOpen returns true if DevTools is open', async () => {
    /**
     * @type {string}
     */
    const isDevToolsOpen = await driver.findElement(selenium.By.id('nw-window-isdevtoolsopen')).getText();
    expect(isDevToolsOpen).toBe('true');
  });

  afterAll(async function () {
    await driver.quit();
  });

});
