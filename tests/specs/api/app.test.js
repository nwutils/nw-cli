import path from 'node:path';

import selenium from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import * as nw from 'nw';

describe('nw.App', { timeout: Infinity }, async function () {
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
      `--nwapp=${path.resolve('tests', 'fixtures', 'app')}`,
      '--headless=new',
    ];
    options.addArguments(args);
    chromedriverPath = await nw.findpath('chromedriver', { flavor: 'sdk' });
    const service = new chrome.ServiceBuilder(chromedriverPath).build();
    driver = chrome.Driver.createSession(options, service);
  });

  it('renders nw.App.argv', async () => {
    /**
     * `nw.App.argv` looks similar to the following:
     * 
     * `"--allow-pre-commit-input,--disable-popup-blocking,--enable-automation,--enable-logging,--headless=new,--user-data-dir=/tmp/.io.nwjs.reD0Us"`
     * 
     * @type {string}
     */
    const argv = await driver.findElement(selenium.By.id('nw-app-argv')).getText();
    
    /* There should be 6 command line arguments. */
    const argvLength = argv.split(',').length;
    expect(argvLength).toBe(6);
    
    /* Since order does not matter, the `.toContain` matcher is used.*/
    expect(argv).toContain('--allow-pre-commit-input');
    expect(argv).toContain('--disable-popup-blocking');
    expect(argv).toContain('--enable-automation');
    expect(argv).toContain('--enable-logging');
    expect(argv).toContain('--headless=new');
    expect(argv).toContain('--user-data-dir=');
  });

  afterAll(async function () {
    await driver.quit();
  });

});