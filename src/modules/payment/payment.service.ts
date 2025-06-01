import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from 'src/core/database/db.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymenService {
    constructor(private prisma: DbService) { }

    async payment(payment: PaymentDto, id: string) {
        const create = await this.prisma.payment.create({
            data: {
                ...payment,
                rentId: id,
            }
        })
        return {
            ...create
        }
    }

    async getMyPaymentHIstory(id: string) {
        try {
            const findRent = await this.prisma.rent.findFirst({
                where: {
                    userId: id
                },
                select: {
                    payment: {
                        select: {
                            id: true,
                            amount: true,
                            method: true,
                            description: true,
                            createdAt: true,
                            paidAt: true,
                            updatedAt: true
                        }
                    }
                }
            })
            return {
                ...findRent
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async getAllPaymentHistory() {
        return await this.prisma.payment.findMany()
    }

}
