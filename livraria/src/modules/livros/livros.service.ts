import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LivrosRepository } from './livros.repository';
import { CriarLivroDto } from './livros.dto';

@Injectable()
export class LivrosService {
  constructor(private readonly livrosRepository: LivrosRepository) {}

  async listarLivros() {
    return this.livrosRepository.listarLivros();
  }

  async listarLivro(id: number) {
    const livroEncontrado = this.livrosRepository.listarLivro(id);

    if (!livroEncontrado) {
      throw new NotFoundException(`Livro com id ${id} não encontrado!`);
    }

    return livroEncontrado;
  }

  async criarLivro(body: CriarLivroDto){
    return await this.livrosRepository.criarLivro(body);
  }
}
