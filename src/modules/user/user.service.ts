import { Injectable } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DbService) { }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, body: any, fileUrl: any) {
    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: body
    })
    const findUser = await this.prisma.userFIle.findFirst({
      where: {
        userId: id
      }
    })
    if (findUser) {
      const del = await this.prisma.userFIle.delete({
        where: {
          id: findUser.id
        }
      })
    }
    const file = await this.prisma.userFIle.create({
      data: {
        userId: id,
        fileUrl
      }
    })
    return {
      user,
      file
    }
  }

  
}
