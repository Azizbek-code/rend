import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseFilters, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { S3Service } from 'src/core/storage/s3/s3.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly s3Serive: S3Service) { }
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['SUPERADMIN', 'ADMIN'])
  async findAll() {
    return this.userService.findAll();
  }

  @Get('get/me/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.s3Serive.uploadFile(file, 'images')
    const UpdatedUser = await this.userService.update(id, body, fileUrl);
    return {
      UpdatedUser
    }
  }

  
}
