import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/db/database/database.constants';
import { autoresTabela } from 'src/db/schemas';
import type { DrizzleDB } from 'src/db/types/drizzleDB';
import { eq, lt, gte, ne } from 'drizzle-orm';
import { AtualizarAutorDto, CriarAutorDto } from './autores.dto';

@Injectable()
export class AutoresRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async listarAutores() {
    try {
      return await this.db.select().from(autoresTabela);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar autores');
    }
  }

  async listarAutor(id: number) {
    try {
      const autorEncontrado = await this.db
        .select()
        .from(autoresTabela)
        .where(eq(autoresTabela.id, id));

      return autorEncontrado[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar um autor');
    }
  }

  async criarAutor(body: CriarAutorDto) {
    try {
      await this.db.insert(autoresTabela).values(body);

      const autorCriado = await this.db
        .select()
        .from(autoresTabela)
        .where(eq(autoresTabela.email, body.email));

      return autorCriado;
    } catch (error) {
      throw new InternalServerErrorException('Erro autor não criado');
    }
  }

  async atualizarAutor(id: number, body: AtualizarAutorDto) {
    try {
      await this.db
        .update(autoresTabela)
        .set(body)
        .where(eq(autoresTabela.id, id));

      return 'Autor atualizado com sucesso';
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar um autor');
    }
  }

  async deletarAutor(id: number){
    try {
      await this.db.
      delete(autoresTabela).where(eq(autoresTabela.id, id))
      return "Autor deletado com sucesso!"
    } catch {
      throw new InternalServerErrorException('Erro ao deletar autor')
    }
  }
}
