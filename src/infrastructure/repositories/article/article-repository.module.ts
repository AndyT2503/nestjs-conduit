import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/domain/entities';
import { ArticleRepository } from './article-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleRepository],
  exports: [ArticleRepository],
})
export class ArticleRepositoryModule {}
