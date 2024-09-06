import { AuthenticatedUser } from './../../keycloak/keycloak/keycloak-auth.guard';
import { FileService } from './../../file/file/file.service';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileDto } from './dto/file.dto';
import {
  KeycloakAuthGuard,
  KeycloakAvailableRoles,
  KeycloakRoles,
} from '../../keycloak/keycloak/keycloak-auth.guard';
import { remove } from 'fs-extra';
import { CustomerDocument } from '../../customer/customer/customer.schemas';
import {
  Paginated,
  Pagination,
} from '../../lib/decorators/pagination.decorator';
import {
  SortFiltered,
  SortFilters,
} from '../../lib/decorators/sort-filters.decorators';

@ApiTags('file')
@UseGuards(KeycloakAuthGuard)
@KeycloakRoles([KeycloakAvailableRoles.USER])
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth('User RBAC JWT access token')
  @ApiOperation({
    description: 'Upload a driver license',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'data', maxCount: 1 }], {
      fileFilter: (req, file, callback) => {
        if (
          file?.fieldname === 'data' &&
          ['image/jpeg', 'application/pdf', 'image/jpg'].includes(file.mimetype)
        ) {
          return callback(null, true);
        } else {
          if (file?.path) {
            remove(file.path);
          }
          return callback(
            new BadRequestException(`invalid multipart/form-data file upload`),
            false,
          );
        }
      },
    }),
  )
  @Post('')
  async uploadFile(
    @UploadedFiles()
    files: {
      data?: Express.Multer.File;
    },
    @AuthenticatedUser() authenticatedUser: CustomerDocument,
  ) {
    if ((files.data as unknown) === 'invalid') {
      throw new BadRequestException(
        `invalid multipart/form-data file upload, only accepting image/jpeg, application/pdf, image/jpg`,
      );
    } else {
      this.fileService.handleFileUpload(files.data[0], authenticatedUser);
    }
  }

  @Get('')
  async getMyFiles(
    @AuthenticatedUser() authenticatedUser: CustomerDocument,
    @Paginated() pagination: Pagination,
    @SortFiltered() sortFilters: SortFilters,
  ) {
    return this.fileService.getMyFiles(
      authenticatedUser,
      pagination,
      sortFilters,
    );
  }
}
