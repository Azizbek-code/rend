import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { RentModule } from './modules/rent/rent.module';
import { PaymenModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreModule,AuthModule,ProductsModule,RentModule, PaymenModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
