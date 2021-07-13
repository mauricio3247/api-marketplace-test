import { BadRequestException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { User, userSchema } from '../user.schema';
import { CreateUserService } from './create-user.service';
import  {MongoMemoryServer}  from 'mongodb-memory-server';

describe('CreateUserService', () => {
    let service: CreateUserService;
    let mongoServer:MongoMemoryServer;
    beforeEach(async () => {
        mongoServer = await MongoMemoryServer.create();
        const module: TestingModule = await Test.createTestingModule({

            imports: [
                MongooseModule.forRoot(mongoServer.getUri()),
                MongooseModule.forFeature([{
                    name: User.name,
                    schema: userSchema
                }])
            ],

            providers: [
                CreateUserService,
            ],
        }).compile();

        service = module.get<CreateUserService>(CreateUserService);
    });

    afterEach(async() => {
        return mongoServer.stop()
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an BadRequest Exception when send user1 ', async () => {
        try {
            await service.create({ email: 'user1@email.com', password: 'password' })
            await service.create({ email: 'user1@email.com', password: 'password' })
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error?.getResponse()).toEqual({ error: 'Bad Request', message: ['user exist'] })
        }
    })


    it('should return an object that match with class CreateUserResponseDto ', async () => {

        const response = await service.create({ email: 'user2@email.com', password: 'password' })
        expect(response).toBeInstanceOf(CreateUserResponseDto);
        expect(response._id).toBeDefined();
        expect(response.rol).toBeDefined();
        expect(response.rol).toEqual('vendor');
        expect(response.email).toBeDefined();
        expect(response.email).toEqual('user2@email.com');
        expect(response.password).toBeDefined();
    })
});
