import { Module, forwardRef } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { CustomerModule } from './customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ...(process.env.NODE_ENV !== 'production'
      ? [
          ConfigModule.forRoot({
            envFilePath: join(process.cwd(), '.env.backend.development'),
          }),
        ]
      : []),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ApiModule,
    forwardRef(() => CustomerModule),
    forwardRef(() => FileModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
