import { Global, Module } from "@nestjs/common";
import { DbModule } from "./database/db.module";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { seederModule } from "./database/seeders/seeders.module";
import { StorageModule } from "./storage/storage.module";

@Global()
@Module({
    imports: [DbModule, seederModule, StorageModule, ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true
    }),
        JwtModule.register({
            global: true,
            secret: 'slaommfjsjfjjkiiosssss',
            signOptions: { expiresIn: '1h' },
        }),],
    providers: [],
})
export class CoreModule { }