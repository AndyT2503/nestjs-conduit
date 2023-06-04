import { ApiProperty } from "@nestjs/swagger";

export class PagingDto<T> {
  @ApiProperty() content: T[];
  @ApiProperty() totalCount: number;
}