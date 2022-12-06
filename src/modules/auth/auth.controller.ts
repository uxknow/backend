import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto';
import { AuthUserResponse } from './response';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @Post('register')
  @ApiResponse({status: 201, type: CreateUserDto})  
  register (@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUsers(dto)
  }

  @ApiTags('API')
  @Post('login')
  @ApiResponse({status: 200, type: AuthUserResponse})
  login (@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test () {
    return true
  }
}
