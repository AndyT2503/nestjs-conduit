import { ApiProperty } from '@nestjs/swagger';

export class ExceptionModel {
  @ApiProperty() statusCode: number;
  @ApiProperty() message: string[];
  @ApiProperty() error: string;
}
