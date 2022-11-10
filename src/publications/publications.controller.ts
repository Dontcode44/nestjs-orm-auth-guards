import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publication } from './entities/publication.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

/* A decorator that is used to create a publication. */
  @UseGuards(JwtAuthGuard)
  @Post()
  createPublication(
    @Body() publication: CreatePublicationDto,
  ): Promise<Publication> {
    return this.publicationsService.createPublication(publication);
  }

  /* A decorator that is used to get all the publications. */
  @UseGuards(JwtAuthGuard)
  @Get()
  getPublication(): Promise<Publication[]> {
    return this.publicationsService.getPublication();
  }
}
