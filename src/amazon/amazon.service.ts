import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AmazonService {
  constructor(private readonly configService: ConfigService) {}

  async getProducts(products: string) {
    // Implementation for fetching products
    const browser = await puppeteer.connect({
      browserWSEndpoint:
        this.configService.getOrThrow<string>('SBR_WS_ENDPOINT'),
    });
    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000); // 2 minutes
      await Promise.all([
        page.waitForNavigation(),
        page.goto(`https://www.amazon.com/`),
      ]);
      await page.type('#twotabsearchtextbox', products);
      await Promise.all([
        page.waitForNavigation(),
        page.click('#nav-search-submit-button'),
      ]);
      return await page.$$eval(
        '.s-search-results .s-card-container',
        (items) => {
          return items.map((item) => {
            const url = item.querySelector<HTMLAnchorElement>('a')?.href;
            const title = item.querySelector(
              '.s-title-instructions-style span',
            )?.textContent;
            const price = item.querySelector(
              '.a-price .a-offscreen',
            )?.textContent;
            return { url, title, price };
          });
        },
      );
      //   await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(products)}`);
    } finally {
      await browser.close();
    }
  }
}
