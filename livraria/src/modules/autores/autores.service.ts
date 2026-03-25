import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarAutorDto } from './autores.dto';

let autores = [
  {
    id: 1,
    nome: 'Hera Silveira',
    email: 'Hera.Ramos@gmail.com',
  },

  {
    id: 2,
    nome: 'Ana Paula',
    email: 'Ana.Paula@gmail.com',
  },
  {
    id: 3,
    nome: 'Paulo Henrique',
    email: 'Paulo.Henrique@gmail.com',
  },
  {
    id: 4,
    nome: 'João da Silva',
    email: 'joao.silva@gmail.com',
  },
];

@Injectable()
export class AutoresService {
  listarAutores() {
    if (!autores) {
      return 'Não há autores cadastrados';
    }
    return autores;
  }

  listarAutor(id: number) {
    const autor = autores.find((autor) => autor.id === id);

    if (!autor) {
      throw new NotFoundException('autor nao encontrado');
    }
    return autor;
  }

  @HttpCode(HttpStatus.CREATED)
  criarAutor(body: CriarAutorDto) {
    if (!body.nome || !body.email) {
      return 'Nome e email sao obrigatorios';
    }
    autores.push({
      id: autores.length + 1,
      nome: body.nome,
      email: body.email,
    });

    return autores;
  }

  atualizarAutor(id: number, body: any) {
    const autorEncontrado = this.listarAutor(id);

    if (!autorEncontrado) {
      return 'Autor não encontrado';
    }

    autorEncontrado.nome = body.nome;
    autorEncontrado.email = body.email;

    return autorEncontrado;
  }

  deletar(id: number) {
    const autor = autores.find((autor) => autor.id === id);

    if (autor) {
      return autores.filter((autor) => autor.id === id);
    }

    return 'Autor não encontrado';
  }
}
