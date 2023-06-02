import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Article, User } from 'src/domain/entities';
import { IRepository } from 'src/domain/repository/repository.interface';
import { AuthService } from 'src/infrastructure/auth';
import { ArticleDto, UpsertArticleDto } from './dto';
import { generateSlug } from '../utils';
import { RepositoryInjectionToken } from 'src/domain/repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class ArticleService {
  constructor(
    @Inject(RepositoryInjectionToken.User) private userRepository: IRepository<User>,
    @Inject(RepositoryInjectionToken.Article) private articleRepository: IRepository<Article>,
    private authService: AuthService,
  ) {}

  async createArticle(request: UpsertArticleDto): Promise<ArticleDto> {
    const author = await this.userRepository.findOne({
      where: {
        id: this.authService.getCurrentUser()!.id,
      },
      select: ['bio', 'image', 'username'],
    });
    if (!author) {
      throw new UnauthorizedException(['Unauthorized']);
    }
    const newArticle = await this.articleRepository.save({
      author: {
        id: this.authService.getCurrentUser()!.id,
      },
      body: request.body,
      description: request.description,
      tags: request.tagList,
      title: request.title,
      slug: generateSlug(request.title),
    });
    return {
      author: {
        bio: author.bio,
        following: false,
        image: author.image,
        username: author.username,
      },
      slug: newArticle.slug,
      body: newArticle.body,
      createdAt: newArticle.createdAt,
      description: newArticle.description,
      favoritesCount: 0,
      tagList: newArticle.tags,
      title: newArticle.title,
      updatedAt: newArticle.updatedAt,
    };
  }
}
