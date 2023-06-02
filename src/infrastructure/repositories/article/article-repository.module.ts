import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/domain/entities';
import { RepositoryInjectionToken } from 'src/domain/repository';
import { ArticleRepository } from './article-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [
    {
      provide: RepositoryInjectionToken.Article,
      useClass: ArticleRepository,
    },
  ],
  exports: [RepositoryInjectionToken.Article],
})
export class ArticleRepositoryModule {}
