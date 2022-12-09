import { IsString, IsEmail } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}