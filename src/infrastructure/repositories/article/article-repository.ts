import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, Comment } from 'src/domain/entities';
import { DeepPartial, Repository, SaveOptions } from 'typeorm';
import { BaseRepository } from '../common';

@Injectable({
  scope: Scope.REQUEST,
})
export class ArticleRepository extends BaseRepository<Article> {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {
    super(articleRepository);
  }

  //TODO: research alternative solution to return new comment when save new comment
  override save<T extends DeepPartial<Article>>(
    entity: T,
    options?: SaveOptions | undefined,
  ): Promise<T & Article> {
    if (entity.comments && entity.comments.some((x) => !x.id)) {
      return this.saveNewArticleComment(entity);
    } else {
      return super.save(entity, options);
    }
  }

  private async saveNewArticleComment<T extends DeepPartial<Article>>(
    article: T,
    options?: SaveOptions | undefined,
  ): Promise<T & Article> {
    const newComment = article.comments?.find((x) => !x.id)!;
    const saveComment = await this.commentRepository.save({
      article: {
        id: article.id,
      },
      content: newComment.content,
      author: {
        id: newComment.author!.id,
      },
    });
    newComment.id = saveComment.id;
    const saveArticle = await super.save(article, options);
    saveArticle.comments = [saveComment];
    return saveArticle;
  }
}
