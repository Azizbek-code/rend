import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { LoginValidatorDto } from './dto/login.admin.dto';
import { RegisterValidatorDto } from './dto/register-admin.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login/admin')
  async login(@Body() body: LoginValidatorDto) {
    return await this.authService.login(body)
  }

  @Get('/')
  async get() {
    return 'salom xammaga'
  }

  @Post('/register/admin')
  @UseGuards(JwtGuard)
  @UseGuards(RoleGuard)
  async registerAdmin(@Body() body: RegisterValidatorDto) {
    return this.authService.registerAdmin(body)
  }

  @Post('/login')
  async registerUsers(@Body() body: RegisterValidatorDto) {
    return this.authService.registerUser(body)
  }

  @Post('/register')
  async loginUser(@Body() body: LoginValidatorDto) {
    return this.authService.loginUser(body)
  }


  @Post()
  async forgotPassword() { }

}
