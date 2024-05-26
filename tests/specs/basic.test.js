import path from 'node:path';

import selenium from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import * as nw from 'nw';

describe('basic app', async function () {
  /**
   * @type {chrome.Driver}
  */
  let driver = undefined;

  /**
   * @type {string}
   */
  let chromedriverPath = undefined;

  beforeAll(async () => {

  }, Infinity);

  it('renders Hello World text', async () => {
    const options = new chrome.Options();
    const args = [
      `--nwapp=${path.resolve('test', 'fixtures', 'basic')}`,
      '--headless=new',
    ];
    options.addArguments(args);

    chromedriverPath = await nw.findpath('chromedriver', { flavor: 'sdk' });

    const service = new chrome.ServiceBuilder(chromedriverPath).build();

    driver = chrome.Driver.createSession(options, service);
    const text = await driver.findElement(selenium.By.id('test')).getText();
    expect(text).toEqual('Hello, World!');
  });

  afterAll(async function () {
    await driver.quit();
  });

}, { timeout: Infinity });
