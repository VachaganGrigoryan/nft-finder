import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class CreateAccountDto {
  guid: string;

  @IsString({ message: 'Username need to be string.' })
  username: string;

  @IsString({ message: 'FirstName need to be string.' })
  firstName: string;

  @IsString({ message: 'LastName need to be string.' })
  lastName: string;

  @ApiProperty({ example: 'example@e-mail.com', description: 'Email' })
  @IsString({ message: 'Email need to be string.' })
  @IsEmail({}, { message: 'Email Address' })
  email: string;
}
