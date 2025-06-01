import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { DbService } from 'src/core/database/db.service';
import { time } from 'console';

@Injectable()
export class ProductsService {
    constructor(private prisma: DbService) { }

    async deleteProduct(id: string) {
        try {
            return await this.prisma.product.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
    async updateProduct(id: string, body: UpdateProductDto) {
        try {
            const findProduct = await this.prisma.user.findUnique({
                where: {
                    id
                }
            })
            if (!findProduct) throw new BadRequestException()
            const update = await this.prisma.product.update({ where: { id }, data: body })
            return { update }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
    async getOne(id: string) {
        try {
            return await this.prisma.product.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
    async getAll() {
        try {
            const find = await this.prisma.product.findMany({
                select: {
                    productFIle: true
                }
            })
            return find
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
    async createProduct(body: CreateProductDto, fileUrl: any) {
        try {
            const product = await this.prisma.product.create({ data: body })
            const productFile = await this.prisma.productFile.create({
                data: {
                    productId: product.id,
                    fileUrl
                }
            })
            return {
                product,
                productFile
            }

        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
