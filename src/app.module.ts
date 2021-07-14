import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import configuration from './config/configuration';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('db_mongo_connection')
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
