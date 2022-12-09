import { Injectable, BadRequestException } from '@nestjs/common';
import { AppError } from '../../common/constants/errors';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
    ) {}

  async registerUsers (dto: CreateUserDto): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email)
      if(existUser) throw new BadRequestException(AppError.USER_EXIST)
      await this.userService.createUser(dto)
      return this.userService.publicUser(dto.email)
    } catch(err) {
      throw new BadRequestException(err, {cause: new Error()})
    }
  }

  async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserByEmail(dto.email)
      if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)
      const validatePassword = await bcrypt.compare(dto.password, existUser.password)
      if(!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
      return this.userService.publicUser(dto.email)
    } catch(err) {
      throw new BadRequestException(err, {cause: new Error()})
    }
  }
}
