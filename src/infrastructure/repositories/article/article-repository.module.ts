import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/domain/entities';
import { AbstractRepository } from '../common';
import { ArticleRepository } from './article-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [
    {
      provide: AbstractRepository<Article>,
      useClass: ArticleRepository,
    },
  ],
  exports: [AbstractRepository<Article>],
})
export class ArticleRepositoryModule {}
