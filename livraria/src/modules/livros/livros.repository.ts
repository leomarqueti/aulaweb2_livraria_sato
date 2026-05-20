import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CriarLivroDto } from './livros.dto';
import { livrosTabela } from 'src/db/schemas';
import { autoresTabela } from 'src/db/schemas';
import type { DrizzleDB } from 'src/db/types/drizzleDB';
import { eq, lt, gte, ne } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/database/database.constants';
import { AutoresService } from '../autores/autores.service';

@Injectable()
export class LivrosRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly autoresService: AutoresService,
  ) {}

  async listarLivros() {
    try {
      return await this.db.select().from(livrosTabela);
    } catch (error) {
      throw new InternalServerErrorException('Livros não encontrados');
    }
  }

  async listarLivro(id: number) {
    try {
      const livroEncontrado = await this.db
        .select()
        .from(livrosTabela)
        .where(eq(livrosTabela.id, id));

      return livroEncontrado[0];
    } catch (error) {
      throw new InternalServerErrorException('Livro não encontrados');
    }
  }

  async criarLivro(body: CriarLivroDto) {
    try {
      const autor = await this.autoresService.listarAutor(body.idAutor);

      if (!autor) {
        throw new InternalServerErrorException('Autor não existe');
      }
      await this.db.insert(livrosTabela).values(body);

      return `Livro ${body.titulo} criado com sucesso`;
    } catch (error) {
      throw new InternalServerErrorException('Livro não foi criado');
    }
  }
}
