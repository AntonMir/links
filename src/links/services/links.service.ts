import { Injectable, NotFoundException } from '@nestjs/common';
import { Link } from '../interfaces/link.interface';

@Injectable()
export class LinksService {
  private links: Link[] = [];

  addLink(hash: string): void {
    this.links.push({ hash, ip: '' });
  }

  getLinks(): string[] {
    return this.links.map((link) => {
      return `http://localhost:3000/api/links/${link.hash}`;
    });
  }

  deleteLink(hash: string): void {
    const index = this.links.findIndex((link) => link.hash === hash);
    if (index !== -1) {
      this.links.splice(index, 1);
    } else {
      throw new NotFoundException(`Link with hash ${hash} not found`);
    }
  }

  useLink(hash: string, ip: string): void {
    const link = this.links.find((link) => link.hash === hash);
    if (link) {
      if (link.ip) {
        throw new NotFoundException(
          `Link with hash ${hash} has already been used`,
        );
      }
      link.ip = ip;
    } else {
      throw new NotFoundException(`Link with hash ${hash} not found`);
    }
  }
}
