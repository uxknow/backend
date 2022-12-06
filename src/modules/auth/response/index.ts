import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthUserResponse {
  @IsString()
  @ApiProperty()
  firstName: string

  @IsString()
  @ApiProperty()
  username: string

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsString()
  @ApiProperty()
  token: string
}