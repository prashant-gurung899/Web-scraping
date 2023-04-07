import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async scrape() {
    const url = 'https://books.toscrape.com/';
    // const url = 'https://www.booklifter.com';
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url);
    // Use Puppeteer to scrape the website
    // await browser.close();
    const bookData = await page.evaluate((url)=>{
        const bookPods = Array.from(document.querySelectorAll('.product_pod'))
        const data = bookPods.map((book: any) => ({
          title: book.querySelector('h3 a').getAttribute('title'),
          rating: book.querySelector('.star-rating').classList[1],
          price: book.querySelector('.product_price .price_color').innerHTML,
          imgSrc : url + book.querySelector('img').getAttribute('src'),
          //   stock: book.querySelector('.instock.availability').text().trim(),
          stock: $(book).find('.instock.availability').text().trim(),
        }));
            return data;
    },url)
    console.log(bookData)
       
  }
}
