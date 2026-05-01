import {
  bit,
  datetime,
  int,
  mssqlTable,
  varchar,
} from 'drizzle-orm/mssql-core';

export const autoresTabela = mssqlTable('autores', {
  id: int('id').primaryKey().identity(),
  nome: varchar('nome', { length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  ativo: bit('ativo').notNull().default(true),
  criadoEm: datetime('criado_em').notNull().defaultGetDate(),
});

export type Author = typeof autoresTabela.$inferSelect;
export type CriarAutorDto = typeof autoresTabela.$inferInsert;
