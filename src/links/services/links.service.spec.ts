import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';

const mockLinksEntity = {
  addLink: jest.fn(),
  getLinks: jest.fn(),
  deleteLink: jest.fn(),
  useLink: jest.fn(),
};

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinksService],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
