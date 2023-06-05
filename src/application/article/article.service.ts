import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'src/domain/const';
import { Article, Comment, User } from 'src/domain/entities';
import { RepositoryInjectionToken } from 'src/domain/repository';
import { IRepository } from 'src/domain/repository/repository.interface';
import { AuthInjectionToken, IAuthService } from 'src/infrastructure/auth';
import { ArrayContains } from 'typeorm';
import { PagingDto, PagingQueryParamsDto } from '../common';
import {
  ArticleDto,
  ArticleQueryParamsDto,
  CommentDto,
  CreateCommentDto,
  UpsertArticleDto,
} from './dto';

function generateSlug(title: string): string {
  const slug = title.toLowerCase().split(' ').join('-');
  return slug;
}

@Injectable({
  scope: Scope.REQUEST,
})
export class ArticleService {
  constructor(
    @Inject(RepositoryInjectionToken.User)
    private userRepository: IRepository<User>,
    @Inject(RepositoryInjectionToken.Article)
    private articleRepository: IRepository<Article>,
    @Inject(RepositoryInjectionToken.Comment)
    private commentRepository: IRepository<Comment>,
    @Inject(AuthInjectionToken)
    private authService: IAuthService,
  ) {}

  async createArticle(request: UpsertArticleDto): Promise<ArticleDto> {
    const author = (await this.userRepository.findOne({
      where: {
        id: this.authService.getCurrentUser()!.id,
      },
      select: ['bio', 'image', 'username'],
    }))!;
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
      favorited: false,
      tagList: newArticle.tags,
      title: newArticle.title,
      updatedAt: newArticle.updatedAt,
    };
  }

  async updateArticle(
    slug: string,
    request: UpsertArticleDto,
  ): Promise<ArticleDto> {
    const author = (await this.userRepository.findOne({
      where: {
        id: this.authService.getCurrentUser()!.id,
      },
    }))!;
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
        author: {
          id: author.id,
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    article.body = request.body;
    article.description = request.description;
    article.tags = request.tagList;
    article.title = request.title;
    article.slug = generateSlug(request.title);
    await this.articleRepository.save(article);
    const updateArticle = (await this.articleRepository.findOne({
      where: {
        id: article.id,
      },
      relations: {
        favorites: {
          author: true,
        },
      },
    }))!;
    return {
      author: {
        bio: author.bio,
        following: false,
        image: author.image,
        username: author.username,
      },
      slug: updateArticle.slug,
      body: updateArticle.body,
      createdAt: updateArticle.createdAt,
      description: updateArticle.description,
      favoritesCount: updateArticle.favorites.length,
      tagList: updateArticle.tags,
      title: updateArticle.title,
      updatedAt: updateArticle.updatedAt,
      favorited: updateArticle.favorites.some((x) => x.author.id === author.id),
    };
  }

  async deleteArticle(slug: string): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
        author: {
          id: this.authService.getCurrentUser()!.id,
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    await this.articleRepository.delete({
      id: article.id,
    });
  }

  async getArticle(slug: string): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        favorites: {
          author: true,
        },
        author: {
          followers: {
            following: true,
          },
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    return {
      author: {
        bio: article.author.bio,
        following: article.author.followers.some(
          (x) => x.following.id === this.authService.getCurrentUser()?.id,
        ),
        image: article.author.image,
        username: article.author.username,
      },
      slug: article.slug,
      body: article.body,
      createdAt: article.createdAt,
      description: article.description,
      favoritesCount: article.favorites.length,
      tagList: article.tags,
      title: article.title,
      updatedAt: article.updatedAt,
      favorited: article.favorites.some(
        (x) => x.author.id === this.authService.getCurrentUser()?.id,
      ),
    };
  }

  async getFeed(query?: PagingQueryParamsDto): Promise<PagingDto<ArticleDto>> {
    const [articles, totalCount] = await this.articleRepository.findAndCount({
      where: {
        author: {
          followers: {
            following: {
              id: this.authService.getCurrentUser()!.id,
            },
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        favorites: {
          author: true,
        },
        author: true,
      },
      skip: query?.offset ?? DEFAULT_OFFSET,
      take: query?.limit ?? DEFAULT_LIMIT,
    });
    return {
      content: articles.map((article) => ({
        author: {
          bio: article.author.bio,
          following: true,
          image: article.author.image,
          username: article.author.username,
        },
        slug: article.slug,
        body: article.body,
        createdAt: article.createdAt,
        description: article.description,
        favoritesCount: article.favorites.length,
        tagList: article.tags,
        title: article.title,
        updatedAt: article.updatedAt,
        favorited: article.favorites.some(
          (x) => x.author.id === this.authService.getCurrentUser()?.id,
        ),
      })),
      totalCount,
    };
  }

  async getGlobalArticles(
    query?: ArticleQueryParamsDto,
  ): Promise<PagingDto<ArticleDto>> {
    const [articles, totalCount] = await this.articleRepository.findAndCount({
      where: {
        ...(query?.tag && { tags: ArrayContains<string>([query.tag]) }),
        ...(query?.author && {
          author: {
            username: query?.author,
          },
        }),
        ...(query?.favorited && {
          favorites: {
            author: {
              username: query.favorited,
            },
          },
        }),
      },
      order: {
        createdAt: 'DESC',
      },
      relations: {
        favorites: {
          author: true,
        },
        author: true,
      },
      skip: query?.offset ?? DEFAULT_OFFSET,
      take: query?.limit ?? DEFAULT_LIMIT,
    });
    return {
      content: articles.map((article) => ({
        author: {
          bio: article.author.bio,
          following: true,
          image: article.author.image,
          username: article.author.username,
        },
        slug: article.slug,
        body: article.body,
        createdAt: article.createdAt,
        description: article.description,
        favoritesCount: article.favorites.length,
        tagList: article.tags,
        title: article.title,
        updatedAt: article.updatedAt,
        favorited: article.favorites.some(
          (x) => x.author.id === this.authService.getCurrentUser()?.id,
        ),
      })),
      totalCount,
    };
  }

  async favoriteArticle(slug: string): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        favorites: {
          author: true,
        },
        author: {
          followers: {
            following: true,
          },
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    await this.articleRepository.save({
      ...article,
      favorites: [
        ...article.favorites,
        {
          author: {
            id: this.authService.getCurrentUser()!.id,
          },
        },
      ],
    });
    return {
      author: {
        bio: article.author.bio,
        following: article.author.followers.some(
          (x) => x.following.id === this.authService.getCurrentUser()?.id,
        ),
        image: article.author.image,
        username: article.author.username,
      },
      slug: article.slug,
      body: article.body,
      createdAt: article.createdAt,
      description: article.description,
      favoritesCount: article.favorites.length,
      tagList: article.tags,
      title: article.title,
      updatedAt: article.updatedAt,
      favorited: true,
    };
  }

  async unFavoriteArticle(slug: string): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
      },
      relations: {
        favorites: {
          author: true,
        },
        author: {
          followers: {
            following: true,
          },
        },
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    article.favorites = article.favorites.filter(
      (x) => x.author.id !== this.authService.getCurrentUser()!.id,
    );
    await this.articleRepository.save(article);
    return {
      author: {
        bio: article.author.bio,
        following: article.author.followers.some(
          (x) => x.following.id === this.authService.getCurrentUser()?.id,
        ),
        image: article.author.image,
        username: article.author.username,
      },
      slug: article.slug,
      body: article.body,
      createdAt: article.createdAt,
      description: article.description,
      favoritesCount: article.favorites.length,
      tagList: article.tags,
      title: article.title,
      updatedAt: article.updatedAt,
      favorited: false,
    };
  }

  async getComments(
    slug: string,
    query?: PagingQueryParamsDto,
  ): Promise<PagingDto<CommentDto>> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    const [comments, totalCount] = await this.commentRepository.findAndCount({
      where: {
        article: {
          id: article.id,
        },
      },
      relations: {
        author: {
          followers: {
            following: true,
          },
        },
      },
      order: {
        createdAt: 'DESC',
      },
      skip: query?.offset ?? DEFAULT_OFFSET,
      take: query?.limit ?? DEFAULT_LIMIT,
    });
    return {
      totalCount,
      content: comments.map((item) => ({
        author: {
          bio: item.author.bio,
          following: item.author.followers.some(
            (x) => x.following.id === this.authService.getCurrentUser()!.id,
          ),
          image: item.author.image,
          username: item.author.username,
        },
        content: item.content,
        createdAt: item.createdAt,
        id: item.id,
        updatedAt: item.createdAt,
      })),
    };
  }

  async createComment(
    slug: string,
    request: CreateCommentDto,
  ): Promise<CommentDto> {
    const article = await this.articleRepository.findOne({
      where: {
        slug: slug,
      },
    });
    if (!article) {
      throw new NotFoundException([`Article ${slug} does not exist`]);
    }
    const author = (await this.userRepository.findOne({
      where: {
        id: this.authService.getCurrentUser()!.id,
      },
    }))!;
    const newComment = await this.commentRepository.save({
      author: {
        id: author.id,
      },
      content: request.content,
      article: {
        id: article.id,
      },
    });
    return {
      author: {
        bio: author.bio,
        following: false,
        image: author.image,
        username: author.username,
      },
      content: newComment.content,
      createdAt: newComment.updatedAt,
      updatedAt: newComment.updatedAt,
      id: newComment.id,
    };
  }

  async deleteComment(slug: string, commentId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        article: {
          slug: slug,
        },
      },
    });
    if (!comment) {
      throw new NotFoundException(['This comment does not exist']);
    }
    await this.commentRepository.delete({
      id: comment.id,
    });
  }
}
