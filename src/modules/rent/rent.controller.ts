import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { RentService } from './rent.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CreateRent } from './dto/create-rent.dto';
import { updateRent } from './dto/update-rent.dto';
import { Request } from 'express';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) { }
  
    @Post()
    @UseGuards(RoleGuard)
    @UseGuards(JwtGuard)
    @SetMetadata('roles', ['ADMIN', 'SUPERADMIN'])
    async createrent(@Body() body: CreateRent,@Query('productId') productId:string,@Req() req:Request) {
      try {
        const id = req['user'].id
        return await this.rentService.createrent(body,id,productId)
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    @Get()
    async getAll() {
      try {
        return await this.rentService.getAll()
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    @Get()
    async getOne(@Param('id') id: string) {
      try {
        return await this.rentService.getOne(id)
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    @Put()
    @UseGuards(RoleGuard)
    @UseGuards(JwtGuard)
    @SetMetadata('roles', ['ADMIN', 'SUPERADMIN'])
    async updateRent(@Param('id') id: string, @Body() body: updateRent) {
      try {
        return await this.rentService.updateRent(id, body)
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    @Delete()
    @UseGuards(RoleGuard)
    @UseGuards(JwtGuard)
    @SetMetadata('roles', ['ADMIN', 'SUPERADMIN'])
    async deleteProduct(@Param('id') id: string) {
      try {
        return await this.rentService.deleteRent(id)
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
}
