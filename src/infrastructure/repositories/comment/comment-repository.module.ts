import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/domain/entities';
import { CommentRepository } from './comment-repository';
import { AbstractRepository } from '../common';
@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [
    {
      provide: AbstractRepository<Comment>,
      useClass: CommentRepository,
    },
  ],
  exports: [AbstractRepository<Comment>],
})
export class CommentRepositoryModule {}
