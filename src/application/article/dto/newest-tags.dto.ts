import { ApiProperty } from '@nestjs/swagger';

export class NewestTagsDto {
  @ApiProperty() tags: string[];
}
