import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRent } from './dto/create-rent.dto';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class RentService {
  constructor(private prisma: DbService) { }

  async deleteRent(id: string) {
    try {
      return await this.prisma.rent.delete({ where: { id } })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async createrent(body: CreateRent, id: any, productId: string) {
    try {
      body['userId'] = id
      return await this.prisma.rent.create({
        data: { 
          ...body,
          userId: id,
          productId: productId
       }  })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async getAll() {
    try {
      return await this.prisma.rent.findMany()
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async getOne(id: string) {
    try {
      return await this.prisma.rent.findUnique({ where: { id } })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  async updateRent(id: string, body: any) {
    try {
      return await this.prisma.rent.update({ where: { id }, data: body })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
