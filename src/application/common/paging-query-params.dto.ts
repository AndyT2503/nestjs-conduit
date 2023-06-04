import { ApiProperty } from "@nestjs/swagger";

export class PagingQueryParamsDto {
  @ApiProperty() readonly limit: number;
  @ApiProperty() readonly offset: number;
}
