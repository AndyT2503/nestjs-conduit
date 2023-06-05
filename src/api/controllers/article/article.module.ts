import { Module } from '@nestjs/common';
import { ArticleService } from 'src/application/article';
import { ArticleRepositoryModule } from 'src/infrastructure/repositories/article';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';
import { ArticleController } from './article.controller';
import { FavoriteRepositoryModule } from 'src/infrastructure/repositories/favorite';
import { CommentRepositoryModule } from 'src/infrastructure/repositories/comment';

@Module({
  imports: [UserRepositoryModule, ArticleRepositoryModule, FavoriteRepositoryModule, CommentRepositoryModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
