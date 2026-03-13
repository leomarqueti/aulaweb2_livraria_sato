import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CriarAutorDto } from './autores.dto';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Get('/listar-autores')
  listarAutores() {
    return this.autoresService.listarAutores();
  }

  @Get('/listar-autor/:id')
  listarAutor(@Param('id', ParseIntPipe) id: number) {
    return this.autoresService.listarAutor(id);
  }

  @Post('/criar-autor')
  criarAutor(@Body() body: CriarAutorDto) {
    return this.autoresService.criarAutor(body);
  }

  @Put('/atualizar-autor/:id')
  atualizarAutor(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    //return this.autoresService.atulizarAutor(id, body);
  }
}
