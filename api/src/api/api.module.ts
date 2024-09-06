import { forwardRef, Module } from '@nestjs/common';
import { FileController } from './file/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { CustomerModule } from '../customer/customer.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { CustomerController } from './customer/customer.controller';
import { HttpModule } from '@nestjs/axios';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [FileController, CustomerController],
  imports: [
    MulterModule.register({
      dest: join(process.cwd(), 'temp'),
    }),
    forwardRef(() => KeycloakModule),
    forwardRef(() => CustomerModule),
    forwardRef(() => FileModule),
    forwardRef(() => HttpModule),
  ],
})
export class ApiModule {}
