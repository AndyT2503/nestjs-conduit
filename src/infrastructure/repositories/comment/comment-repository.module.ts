import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/domain/entities';
import { AbstractRepository } from 'src/domain/repository';
import { CommentRepository } from './comment-repository';
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
