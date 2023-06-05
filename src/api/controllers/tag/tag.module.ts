import { Module } from '@nestjs/common';
import { ArticleService } from 'src/application/article';
import { ArticleRepositoryModule } from 'src/infrastructure/repositories/article';
import { CommentRepositoryModule } from 'src/infrastructure/repositories/comment';
import { FavoriteRepositoryModule } from 'src/infrastructure/repositories/favorite';
import { UserRepositoryModule } from 'src/infrastructure/repositories/user';
import { TagController } from './tag.controller';

@Module({
  imports: [
    UserRepositoryModule,
    ArticleRepositoryModule,
    FavoriteRepositoryModule,
    CommentRepositoryModule,
  ],
  providers: [ArticleService],
  controllers: [TagController],
})
export class TagModule {}
