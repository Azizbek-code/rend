import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { S3Service } from 'src/core/storage/s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,private readonly s3Servise:S3Service) { }

  @Post()
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['ADMIN', 'SUPERADMIN'])
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(@Body() body: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    try {
      const fileUrl = await this.s3Servise.uploadFile(file,'images')
      const product = await this.productsService.createProduct(body,fileUrl)
      return {
        ...product,
        fileUrl
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.productsService.getAll()
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Get()
  async getOne(@Param('id') id: string) {
    try {
      return await this.productsService.getOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Put()
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['ADMIN', 'SUPERADMIN'])
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    try {
      return await this.productsService.updateProduct(id, body)
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
      return await this.productsService.deleteProduct(id)
      
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
