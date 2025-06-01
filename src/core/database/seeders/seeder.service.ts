import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { DbService } from "../db.service";
import { ConfigService } from "@nestjs/config";
import bcrypt from 'bcrypt'

@Injectable()
export class SeederService implements OnModuleInit {
    private readonly logger = new Logger()
    constructor(private prisma: DbService, private configService: ConfigService) { }
    async seedAll() {
        await this.seedUsers()
    }
    async seedUsers() {

        const username = this.configService.get('SUPERADMIN_USERNAME')
        const passsword = this.configService.get<string>('SUPERADMIN_PASSWORD') as string
        console.log(passsword);

        const findSuperAdmin = await this.prisma.user.findUnique({
            where: { username }
        })
        if (!passsword) {
            throw new Error('SUPERADMIN_PASSWORD is not defined in the environment variables');
        }
        const hashedPassword = await bcrypt.hash(passsword, 12)
        if (!findSuperAdmin) {
            await this.prisma.user.create({
                data: {
                    username: username,
                    email: 'aziz@gmail.com',
                    role: "SUPERADMIN",
                    phone: '998777777752',
                    fullName: 'azizbek',
                    password: hashedPassword
                }
            })
        }
    }
    async onModuleInit() {
        try {
            await this.seedAll()
        } catch (error) {
            this.logger.error(error)
            process.exit(1)
        }
    }
}