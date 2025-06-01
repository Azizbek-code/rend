import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginValidatorDto } from './dto/login.admin.dto';
import { RegisterValidatorDto } from './dto/register-admin.dto';
import { DbService } from 'src/core/database/db.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private prisma: DbService, private jwt: JwtService) { }
  async registerUser(body: RegisterValidatorDto) {
    try {
      const username = body.username
      const findUser = await this.prisma.user.findUnique({
        where: {
          username
        }
      })
      if (findUser) return new BadRequestException('username already registered')
      const hashedPassword = await bcrypt.hash(body.password, 12)
      body.password = hashedPassword
      const { password, ...result } = await this.prisma.user.create({ data: body })
      const access_token = this.jwt.sign(result)
      return { access_token }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async loginUser(body: LoginValidatorDto) {
    try {
      const username = body.username
      const findUser = await this.prisma.user.findUnique({
        where: {
          username
        }
      })
      console.log('salomqq');
      
      if (!findUser) return new UnauthorizedException('username or password is incorecct')
      const comparePassword = await bcrypt.compare(body.password, findUser.password);
      if (!comparePassword) return new UnauthorizedException('username or password is incorecct')
      const { password, ...result } = findUser
      const access_token = this.jwt.sign(result)
      return {
        access_token
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async login(body: LoginValidatorDto) {
    try {
      const username = body.username;
      const findUser = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!findUser) throw new UnauthorizedException('username or password is incorrect');
      if (findUser.role === 'USER') throw new BadRequestException('username or password is incorrect');
      const comparePassword = await bcrypt.compare(body.password, findUser.password);
      if (!comparePassword) throw new UnauthorizedException('username or password is incorrect');
      const { password, ...result } = findUser;
      const access_token = this.jwt.sign(result);
      return {
        access_token,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async registerAdmin(body: RegisterValidatorDto) {
    try {
      body['role'] = 'ADMIN'
      const username = body.username
      const findUser = await this.prisma.user.findUnique({
        where: {
          username
        }
      })
      if (findUser) return new BadRequestException('username already registered')
      const hashedPassword = await bcrypt.hash(body.password, 12)
      body.password = hashedPassword
      const { password, ...result } = await this.prisma.user.create({ data: body })
      const access_token = this.jwt.sign(result)
      return { access_token }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
