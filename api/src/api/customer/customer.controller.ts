import { Controller, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from '../../customer/customer/customer.service';
import {
  KeycloakAuthGuard,
  KeycloakAvailableRoles,
  DatabaseCustomerNoFetch,
  KeycloakRoles,
  TokenPayload,
} from '../../keycloak/keycloak/keycloak-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@ApiBearerAuth('User RBAC JWT access token')
@UseGuards(KeycloakAuthGuard)
@KeycloakRoles([KeycloakAvailableRoles.USER])
@DatabaseCustomerNoFetch(false)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({
    summary: 'Register a customer using the jwt token',
  })
  @DatabaseCustomerNoFetch(true)
  @Post('')
  createCustomer(@TokenPayload() tokenPayload: TokenPayload) {
    return this.customerService.create({
      authorizationServerUserId: tokenPayload.sub,
      email: tokenPayload.email,
      firstName: tokenPayload.preferred_username,
      lastName: tokenPayload.family_name,
      fullName: tokenPayload.given_name,
    });
  }
}
