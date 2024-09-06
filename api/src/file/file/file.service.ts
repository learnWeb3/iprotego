import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFileDto } from '../../lib/dto/create-file.dto';
import { CustomerService } from '../../customer/customer/customer.service';
import { CustomerDocument } from '../../customer/customer/customer.schemas';
import { File, FileDocument } from './file.schemas';
import { v4 as uuid } from 'uuid';
import { move } from 'fs-extra';
import {
  PaginatedResults,
  Pagination,
} from '../../lib/decorators/pagination.decorator';
import { SortFilters } from '../../lib/decorators/sort-filters.decorators';

@Injectable()
export class FileService {
  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
  ) {}

  async deleteFiles(filters: FilterQuery<File>): Promise<void> {
    await this.fileModel.deleteMany(filters);
  }

  exists(filters: FilterQuery<File>) {
    return this.fileModel.exists(filters);
  }

  findOne(filters: FilterQuery<File>): Promise<FileDocument> {
    return this.fileModel.findOne(filters);
  }

  getCollectionName(): string {
    return this.fileModel.collection.name;
  }

  async handleFileUpload(
    file: Express.Multer.File,
    customer: CustomerDocument,
  ) {
    try {
      const outputFileName =
        Date.now() + '_' + uuid() + '_' + file.originalname;
      const outputFilePath =
        process.cwd() + '/' + 'uploads' + '/' + outputFileName;
      const tempSourcePath = file.path;
      await move(tempSourcePath, outputFilePath);
      await this.create({
        originalName: file.originalname,
        serverName: outputFileName,
        customer: customer._id,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        `Unexpected error registering file on the server`,
      );
    }
  }

  async getMyFiles(
    authenticatedUser: CustomerDocument,
    pagination: Pagination,
    sortFilters: SortFilters,
  ): Promise<PaginatedResults<FileDocument>> {
    const filters = {
      customer: authenticatedUser._id,
    };
    const results = await this.fileModel
      .aggregate([
        {
          $match: filters,
        },
        {
          $sort: {
            [sortFilters.sort]: sortFilters.order,
          },
        } as any,
        {
          $skip: pagination.start,
        },
        {
          $limit: pagination.limit,
        },
      ])
      .exec();

    const count = await this.fileModel.aggregate([
      {
        $match: filters,
      },
      {
        $count: 'count',
      },
    ]);

    return {
      results,
      count: count[0]?.count || 0,
      start: pagination.start,
      limit: pagination.limit,
    };
  }
  private async create(createFileDto: CreateFileDto): Promise<{ _id: string }> {
    const customer = await this.customerService.findOne({
      _id: createFileDto.customer,
    });

    if (!customer) {
      throw new BadRequestException(`customer must exists`);
    }

    const newFile = new this.fileModel(createFileDto);
    const savedFile = await newFile.save();
    return { _id: savedFile._id.toString() };
  }
}
