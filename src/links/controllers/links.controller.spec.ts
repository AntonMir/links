import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { LinksService } from '../services/links.service';

describe('LinksController', () => {
  let controller: LinksController;

  beforeEach(async () => {
    const linkModule: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [LinksService],
    }).compile();

    controller = linkModule.get<LinksController>(LinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
