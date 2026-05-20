import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AtualizarAutorDto, CriarAutorDto } from './autores.dto';
import { AutoresRepository } from './autores.repository';

@Injectable()
export class AutoresService {
  constructor(private readonly autoresRepository: AutoresRepository) {}

  async listarAutores() {
    return await this.autoresRepository.listarAutores();
  }

  async listarAutor(id: number) {
    const autorEncontrado = await this.autoresRepository.listarAutor(id);

    if (!autorEncontrado) {
      throw new NotFoundException(`Autor com id ${id} não encontrado!`);
    }

    return autorEncontrado;
  }

  async criarAutor(body: CriarAutorDto) {
    return await this.autoresRepository.criarAutor(body);
  }

  async atualizarAutor(idAutor: number, body: AtualizarAutorDto) {
    await this.listarAutor(idAutor);

    return this.autoresRepository.atualizarAutor(idAutor, body);
  }


  async deletarAutor(id: number) {
    await this.listarAutor(id);

    return this.autoresRepository.deletarAutor(id);
  }

}
