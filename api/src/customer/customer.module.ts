import { Global, Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './customer/customer.schemas';

@Global()
@Module({
  providers: [CustomerService],
  exports: [CustomerService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
})
export class CustomerModule {}
