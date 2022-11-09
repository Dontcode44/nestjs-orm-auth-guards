import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepo: Repository<Publication>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * It creates a new publication and saves it to the database
   * @param {CreatePublicationDto} publication - CreatePublicationDto
   * @returns The new publication
   */
  createPublication(publication: CreatePublicationDto) {
    const userFound = this.usersService.getOneUser(publication.authorId);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPubliccation = this.publicationRepo.create(publication);
    return this.publicationRepo.save(newPubliccation);
  }

  /**
   * It returns a promise that resolves to an array of publications
   * @returns An array of all the publications in the database.
   */
  async getPublication() {
    return await this.publicationRepo.find({
      take: 10,
      order: {
        createdAt: 'DESC',
      },
      skip: 10,
    });
  }
}
