import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CriarLivroDto } from './livros.dto';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}
  @Get('listar-livros')
  listarLivros() {
    return this.livrosService.listarLivros();
  }

  @Get('/listar-livro/:id')
  listarLivro(@Param('id', ParseIntPipe) id: number) {
    return this.livrosService.listarLivro(id);
  }

  @Post('/criar-livro')
  criarLivro(@Body() body: CriarLivroDto) {
    return this.livrosService.criarLivro(body);
  }
}
