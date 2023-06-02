import { Module } from '@nestjs/common';
import { ArticleService } from 'src/application/article';
import { ArticleRepositoryModule } from 'src/infrastructure/repositories/article';
import { ArticleController } from './article.controller';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';

@Module({
  imports: [UserRepositoryModule, ArticleRepositoryModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
