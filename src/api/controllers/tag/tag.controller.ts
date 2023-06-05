import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService, NewestTagsDto } from 'src/application/article';
import { ExceptionModel } from 'src/infrastructure/exceptions';

@ApiResponse({
  status: 422,
  description: 'Unexpected Error',
  type: ExceptionModel,
})
@ApiTags('tag')
@Controller({
  path: 'tag',
})
export class TagController {
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({
    type: NewestTagsDto,
  })
  @Get('newest')
  async getNewestTag(): Promise<NewestTagsDto> {
    return await this.articleService.getNewestTags();
  }
}
