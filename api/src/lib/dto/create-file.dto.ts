import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  serverName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  originalName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  customer: string;
}
