import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService
  ) {}

  async hashPassword (password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10)
    } catch(err) {
      throw new Error(err)
    }
  }

  async findUserByEmail (email: string): Promise<User> {
    try {
      return this.userRepository.findOne({where: {email: email}, include: {
        model: Watchlist,
        required: false,
      }})
    } catch(err) {
      throw new Error(err)
    }
  }

 async createUser(createUserDto): Promise<CreateUserDto> {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password)
      await this.userRepository.create({
        firstName: createUserDto.firstName,
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password
      })
      return createUserDto
    } catch(err) {
      throw new Error(err)
    }
  }

  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: {email},
        attributes: {exclude: ['password']},
        include: {
          model: Watchlist,
          required: false
        }
      })
      const token = await this.tokenService.generateJwtToken(user)
      return {user, token}
    } catch(err) {
      throw new Error(err)
    }
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, {where: {email}})
      return dto
    } catch(err) {
      throw new Error(err)
    }
  }

  async deleteUser(email: string): Promise<boolean> {
   try {
    await this.userRepository.destroy({where: {email}})
    return true
   } catch(err) {
     throw new Error(err)
   }
  }
}
