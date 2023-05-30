import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty() readonly username: string;
  @ApiProperty() @ValidateIf(e => !!e.email) @IsEmail() readonly email: string;
  @ApiProperty() readonly password: string;
  @ApiProperty() readonly image: string;
  @ApiProperty() readonly bio: string;
}
