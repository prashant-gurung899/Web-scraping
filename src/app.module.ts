import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperService } from './scraper/scraper.service';
import { ScraperController } from './scraper/scraper.controller';
import { PrismaModule } from './prisma/prisma.module';
// import * as nestPuppeteer from 'nest-puppeteer';
// import * as puppeteer from 'puppeteer';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, ScraperController],
  providers: [AppService, ScraperService],
})
export class AppModule {}
