import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from '../customer/customer/customer.service';
import { FileService } from './file/file.service';
import { CustomerModule } from '../customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './file/file.schemas';
import {
  Customer,
  CustomerSchema,
} from '../customer/customer/customer.schemas';

@Module({
  providers: [CustomerService, FileService],
  exports: [FileService],
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    forwardRef(() => CustomerModule),
  ],
})
export class FileModule {}
