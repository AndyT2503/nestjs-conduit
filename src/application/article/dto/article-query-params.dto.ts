import { ApiProperty } from '@nestjs/swagger';
import { PagingQueryParamsDto } from 'src/application/common';

export class ArticleQueryParamsDto extends PagingQueryParamsDto {
  @ApiProperty() readonly tag: string;
  @ApiProperty() readonly author: string;
  @ApiProperty() readonly favorited: string;
}
