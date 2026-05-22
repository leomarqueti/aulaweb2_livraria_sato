import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CriarLivroDto {
  @IsNumber()
  idAutor: number;
  @IsString({ message: 'O titulo deve ser uma string' })
  @IsNotEmpty({ message: 'O titulo é obrigatório' })
  @MinLength(3, { message: 'O titulo deve ter pelo menos 3 caracteres' })
  @MaxLength(100, { message: 'O titulo deve ter no máximo 100 caracteres' })
  @Transform(({ value }) => {
    const valor = typeof value;
    if (valor === 'string') {
      return value.trim();
    }
  }) //remove espaços em branco do nome
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'O titulo deve conter apenas letras e espaços',
  }) //expressão regular para validar o nome
  titulo: string;
  @IsString()
  @MaxLength(500, { message: 'O descricao deve ter no máximo 100 caracteres' })
  descricao: string;
}
