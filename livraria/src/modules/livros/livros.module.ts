import { Module } from '@nestjs/common';
import { LivrosController } from './livros.controller';
import { LivrosService } from './livros.service';
import { LivrosRepository } from './livros.repository';
import { AutoresRepository } from '../autores/autores.repository';
import { AutoresService } from '../autores/autores.service';
import { AutoresModule } from '../autores/autores.module';

@Module({
  imports: [AutoresModule],
  controllers: [LivrosController],
  providers: [LivrosService, LivrosRepository],
  exports: [],
})
export class LivrosModule {}
