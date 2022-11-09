import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publication } from './entities/publication.entity';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  /* Creating a new publication. */
  @Post()
  createPublication(
    @Body() publication: CreatePublicationDto,
  ): Promise<Publication> {
    return this.publicationsService.createPublication(publication);
  }

  /* A method that returns a promise of an array of publications. */
  @Get()
  getPublication(): Promise<Publication[]> {
    return this.publicationsService.getPublication();
  }
}
