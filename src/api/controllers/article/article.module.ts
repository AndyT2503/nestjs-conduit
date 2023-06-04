import { Module } from '@nestjs/common';
import { ArticleService } from 'src/application/article';
import { ArticleRepositoryModule } from 'src/infrastructure/repositories/article';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';
import { ArticleController } from './article.controller';

@Module({
  imports: [UserRepositoryModule, ArticleRepositoryModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
