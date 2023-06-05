import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty() statusCode: number;
  @ApiProperty() message: string[];
  @ApiProperty() error: string;
}
