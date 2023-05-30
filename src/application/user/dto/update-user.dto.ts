import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty() readonly username: string;
  @ApiProperty() @IsOptional() @IsEmail() readonly email: string;
  @ApiProperty() readonly password: string;
  @ApiProperty() readonly image: string;
  @ApiProperty() readonly bio: string;
}
