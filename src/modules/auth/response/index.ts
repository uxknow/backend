import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

class UserResponse {
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
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse

  @IsString()
  @ApiProperty()
  token: string
}