import { Controller, Get, Param } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { CreateScrapDto } from './dto/create-scrap.dto';
import { UpdateScrapDto } from './dto/update-scrap.dto';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async scrape() {
    return this.scraperService.scrape();
  }

}