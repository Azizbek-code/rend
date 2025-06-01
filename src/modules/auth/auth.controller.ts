import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { LoginValidatorDto } from './dto/login.admin.dto';
import { RegisterValidatorDto } from './dto/register-admin.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login/admin')
  async login(@Body() body: LoginValidatorDto, @Res({passthrough:true}) res: Response) {
    const access_token = await this.authService.login(body)
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
    });
    console.log(body);
    
    return {
      access_token,
      'message': 'barchasi muvafaqiyatli'
    }
  }

  @Get('/')
  async get() {
    return 'salom xammaga'
  }

  @Post('/register/admin')
  @UseGuards(JwtGuard)
  @UseGuards(RoleGuard)
  async registerAdmin(@Body() body: RegisterValidatorDto, @Res() res: Response) {
    const access_token = await this.authService.registerAdmin(body)
    res.cookie('access_token', access_token)
    return {
      'message': 'barchasi muvafaqiyatli'
    }
  }

  @Post('/register')
  async registerUsers(@Body() body: RegisterValidatorDto, @Res() res: Response) {
    console.log(body);

    const access_token = await this.authService.registerUser(body)
    res.cookie('access_token', access_token)
    console.log(access_token);

    return {
      'message': 'barchasi muvafaqiyatli'
    }
  }

  @Post('/login')
  async loginUser(@Body() body: LoginValidatorDto, @Res() res: Response) {
    const access_token = await this.authService.loginUser(body)
    res.cookie('access_token', access_token)
    return {
      'message': 'barchasi muvafaqiyatli'
    }
  }


  @Post()
  async forgotPassword() { }

}
