import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/domain/entities';
import { RepositoryInjectionToken } from 'src/domain/repository';
import { CommentRepository } from './comment-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [
    {
      provide: RepositoryInjectionToken.Comment,
      useClass: CommentRepository,
    },
  ],
  exports: [RepositoryInjectionToken.Comment],
})
export class CommentRepositoryModule {}
