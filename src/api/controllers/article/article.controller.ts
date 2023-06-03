import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import {
  ArticleService,
  ArticleDto,
  UpsertArticleDto,
} from 'src/application/article';
import { AuthGuard } from 'src/infrastructure/auth';

@ApiTags('article')
@Controller({
  path: 'article',
})
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createArticle(@Body() request: UpsertArticleDto): Promise<ArticleDto> {
    return await this.articleService.createArticle(request);
  }

  @ApiOkResponse({
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  @Put(':slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() request: UpsertArticleDto,
  ): Promise<ArticleDto> {
    return await this.articleService.updateArticle(slug, request);
  }

  @ApiOkResponse()
  @UseGuards(AuthGuard)
  @Delete(':slug')
  async deleteArticle(@Param('slug') slug: string): Promise<void> {
    await this.articleService.deleteArticle(slug);
  }
}
