import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { data } from 'jquery';
import * as puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScraperService {
  constructor(private readonly prismaService: PrismaService){}
  async scrape() {
    const url = 'https://books.toscrape.com/';
    // const url = 'https://www.booklifter.com';
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url);
    // Use Puppeteer to scrape the website

    const bookData = await page.evaluate((url) => {
      const bookPods = Array.from(document.querySelectorAll('.product_pod'));
      const data = bookPods.map((book: any) => ({
        title: book.querySelector('h3 a').getAttribute('title'),
        rating: book.querySelector('.star-rating').classList[1],
        price: book.querySelector('.product_price .price_color').innerHTML,
        imgSrc: url + book.querySelector('img').getAttribute('src'),
        // stock: book.querySelector('.instock.availability').text().trim(),
        stock: $(book).find('.instock.availability').text().trim(),
      }));
      return data;
    }, url);

    for (const book of bookData) {
      await this.prismaService.book.create({
        data: {
          title: book.title,
          rating: book.rating,
          price: book.price,
          imgSrc: book.imgSrc,
          stock: book.stock,
        },
      });
    }

    console.log(bookData);
    // await browser.close();
  }
}
