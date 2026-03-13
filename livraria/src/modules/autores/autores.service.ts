import { Injectable } from '@nestjs/common';
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

    if (autor) {
      return autor;
    }

    return 'Autor não encontrado';
  }

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
    const autor = autores.find((autor) => autor.id === id);
  }
}
