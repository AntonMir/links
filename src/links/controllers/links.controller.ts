import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { LinksService } from '../services/links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  addLink(@Body('hash') hash: string): void {
    this.linksService.addLink(hash);
  }

  @Get()
  getLinks(): any {
    return this.linksService.getLinks();
  }

  @Delete(':hash')
  deleteLink(@Param('hash') hash: string): void {
    this.linksService.deleteLink(hash);
  }

  @Get(':hash')
  useLink(@Param('hash') hash: string, @Req() request, @Res() response): void {
    const ip = request.ip;
    try {
      this.linksService.useLink(hash, ip);
      response.status(301).send('Link used');
    } catch (error) {
      response.status(404).send(error.message);
    }
  }
}
