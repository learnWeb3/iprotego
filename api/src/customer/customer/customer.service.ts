import { FilterQuery, Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schemas';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaginatedResults,
  Pagination,
} from '../../lib/decorators/pagination.decorator';
import { SortFilters } from '../../lib/decorators/sort-filters.decorators';
import { CreateCustomerDto } from '../../lib/dto/create-customer.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
  ) {}

  exists(filters: FilterQuery<Customer>) {
    return this.customerModel.exists(filters);
  }

  findOne(filters: FilterQuery<Customer>): Promise<CustomerDocument> {
    return this.customerModel.findOne(filters);
  }

  getCollectionName(): string {
    return this.customerModel.collection.name;
  }

  async deleteCustomers(filters: FilterQuery<Customer>): Promise<void> {
    await this.customerModel.deleteMany(filters);
  }

  async findAll(
    filters: FilterQuery<Customer>,
    pagination: Pagination,
    sortFilters: SortFilters,
  ): Promise<PaginatedResults<CustomerDocument>> {
    const results = await this.customerModel
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

    const count = await this.customerModel.aggregate([
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

  async create(createCustomerDto: CreateCustomerDto): Promise<{ _id: string }> {
    const user = await this.findOne({
      authorizationServerUserId: createCustomerDto.authorizationServerUserId,
    });
    if (user) {
      return { _id: user._id };
    }

    const newCustomer = new this.customerModel({
      authorizationServerUserId: createCustomerDto.authorizationServerUserId,
      insurer: false,
      firstName: createCustomerDto.firstName,
      lastName: createCustomerDto.lastName,
      fullName: createCustomerDto.fullName,
    });
    const savedCustomer = await newCustomer.save();
    return { _id: savedCustomer._id };
  }
}
