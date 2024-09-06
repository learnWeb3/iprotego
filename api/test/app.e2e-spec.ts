import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { join } from 'path';
import { stringify } from 'querystring';
import { CustomerService } from '../src/customer/customer/customer.service';
import { HttpService } from '@nestjs/axios';
import * as mongoose from 'mongoose';
import { FileService } from '../src/file/file/file.service';

async function getUserToken(
  app: INestApplication,
  tokenIssuer: string,
  user: { email: string; password: string },
): Promise<string> {
  const clientId = 'iprotego-public-app';
  const body = stringify({
    client_id: clientId,
    username: user.email,
    password: user.password,
    grant_type: 'password',
  });

  return await app
    .get(HttpService)
    .axiosRef.post(tokenIssuer + '/protocol/openid-connect/token', body, {
      headers: { 'Content-Type': ' application/x-www-form-urlencoded' },
    })
    .then((response) => {
      return response.data.access_token;
    })
    .catch((error) => {
      console.log(error);
    });
}

describe('AppController (e2e)', () => {
  const dataFilePathJPEG: string = join(
    process.cwd(),
    'test',
    'data',
    'driver_license.jpeg',
  );

  const dataFilePathPDF: string = join(
    process.cwd(),
    'test',
    'data',
    'driver_license.pdf',
  );

  const dataFilePathInvalidMimetypePNG: string = join(
    process.cwd(),
    'test',
    'data',
    'driver_license.png',
  );

  const dataFilePathInvalidMimetypeICO: string = join(
    process.cwd(),
    'test',
    'data',
    'driver_license.ico',
  );

  let app: INestApplication;

  let server: any;
  let mikeToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  beforeEach(async () => {
    mikeToken = await getUserToken(app, process.env.KEYCLOAK_ISSUER, {
      email: 'mike@yopmail.com',
      password: 'foobar',
    });
  });

  afterAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.get(CustomerService).deleteCustomers({ _id: { $ne: null } });
    await app.get(FileService).deleteFiles({ _id: { $ne: null } });
    await app.close();
    await mongoose.disconnect();
    server.close();
  });

  it('/customer (POST), register a mike user using an access token for the user', () => {
    return request(server)
      .post('/customer')
      .set('Authorization', 'Bearer ' + mikeToken)
      .send({})
      .expect(201)
      .then((res) => {
        console.log(`mike user id is: ${res.body._id}`);
      });
  });

  it('/file (POST): Reject uploading a file in JPEG format without access token', () => {
    return request(app.getHttpServer())
      .post('/file')
      .attach('data', dataFilePathJPEG)
      .expect(403);
  });

  it('/file (POST): Reject uploading a file in JPEG format with invalid access token', () => {
    return request(app.getHttpServer())
      .post('/file')
      .set('Authorization', 'Bearer ' + 'invalid')
      .attach('data', dataFilePathJPEG)
      .expect(403);
  });

  it('/file (POST): Upload a file in JPEG format with valid access token', () => {
    return request(app.getHttpServer())
      .post('/file')
      .set('Authorization', 'Bearer ' + mikeToken)
      .attach('data', dataFilePathJPEG)
      .expect(201);
  });

  it('/file (GET): Get a paginated and sort filtered list of the current user uploaded files that have a total count of 1 file', () => {
    return request(app.getHttpServer())
      .get('/file')
      .set('Authorization', 'Bearer ' + mikeToken)
      .expect(200)
      .then((res) => {
        expect(res.body.count).toEqual(1);
      });
  });

  it('/file (POST): Upload a file in PDF format with valid access token', () => {
    return request(app.getHttpServer())
      .post('/file')
      .set('Authorization', 'Bearer ' + mikeToken)
      .attach('data', dataFilePathPDF)
      .expect(201);
  });

  it('/file (GET): Get a paginated and sort filtered list of the current user uploaded files that have a total count of 2 files', () => {
    return request(app.getHttpServer())
      .get('/file')
      .set('Authorization', 'Bearer ' + mikeToken)
      .expect(200)
      .then((res) => {
        expect(res.body.count).toEqual(2);
      });
  });

  it('/file (POST): Reject a file upload in PNG format with valid access token', () => {
    return request(app.getHttpServer())
      .post('/file')
      .set('Authorization', 'Bearer ' + mikeToken)
      .attach('data', dataFilePathInvalidMimetypePNG)
      .expect(400);
  });

  it('/file (POST): Reject a file upload in ICO format with valid access token', () => {
    return request(app.getHttpServer())
      .post('/file')
      .set('Authorization', 'Bearer ' + mikeToken)
      .attach('data', dataFilePathInvalidMimetypeICO)
      .expect(400);
  });
});
